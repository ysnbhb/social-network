package services

import (
	"errors"
	"html"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatPost(postRequest *models.PostRequest) error {
	err := utils.ValidatePost(postRequest)
	if err != nil {
		return errors.New("validating post: " + err.Error())
	}
	postRequest.Content = html.EscapeString(postRequest.Content)
	err = repo.CreatPost(postRequest)
	if err != nil {
		return errors.New("creating post in db:" + err.Error())
	}
	return nil
}
