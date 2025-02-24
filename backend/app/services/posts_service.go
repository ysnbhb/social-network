package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatPost(postRequest *models.PostRequest) error {
	err := utils.ValidatePost(postRequest)
	if err != nil {
		return errors.New("validating post: " + err.Error())
	}
	if postRequest.File != nil {
		err = utils.ValidImg(postRequest.FileHeader.Header.Get("Content-Type"), postRequest.FileHeader.Size)
		if err != nil {
			return errors.New("validating image: " + err.Error())
		}
		postRequest.ImageUrl, err = utils.SaveImg(postRequest.File)
		if err != nil {
			return errors.New("field to save image")
		}
	}
	if postRequest.GroupId != 0 && !repo.CheckUserInGroup(postRequest.GroupId, postRequest.UserId) {
		return errors.New("you can't post in this group")
	}
	err = repo.CreatPost(postRequest)
	if err != nil {
		return errors.New("creating post in db:" + err.Error())
	}
	return nil
}
