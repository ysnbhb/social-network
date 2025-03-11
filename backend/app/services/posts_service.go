package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatPost(postRequest *models.PostRequest) (*models.PostsResponse, error) {
	err := utils.ValidatePost(postRequest)
	if err != nil {
		return nil, errors.New("validating post: " + err.Error())
	}
	if len(postRequest.ImgContant) != 0 {
		postRequest.ImageUrl, err = utils.SaveImg(postRequest.ImgContant)
		if err != nil {
			return nil, errors.New("field to save image")
		}
	}
	if postRequest.GroupId != 0 && !repo.CheckUserInGroup(postRequest.GroupId, postRequest.UserId) {
		return nil, errors.New("you can't post in this group")
	}
	post, err := repo.CreatPost(postRequest)
	if err != nil {
		return nil, errors.New("creating post in db:" + err.Error())
	}
	return post, nil
}

func GetOneCard(cardId int, userId int) (*models.PostsResponse, error) {
	post, err := repo.GetOneCard(cardId, userId)
	if err != nil {
		return nil, errors.New("getting post from db:" + err.Error())
	}
	return post, nil
}
