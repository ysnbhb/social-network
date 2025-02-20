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
	if postRequest.GroupId != 0 && !repo.CheckUserInGroup(postRequest.GroupId, postRequest.UserId) {
		return errors.New("you can't post in this group")
	}
	err = repo.CreatPost(postRequest)
	if err != nil {
		return errors.New("creating post in db:" + err.Error())
	}
	return nil
}
