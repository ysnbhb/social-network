package services

import (
	"errors"
	"html"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func AddComments(commentRequest *models.CommentRequest) error {
	err := utils.ValidateComment(commentRequest)
	if err != nil {
		return errors.New("validating comment:")
	}
	commentRequest.Content = html.EscapeString(commentRequest.Content)
	err = repo.AddComment(commentRequest)
	if err != nil {
		return errors.New("adding comment to db:")
	}
	return nil
}
