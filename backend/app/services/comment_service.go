package services

import (
	"errors"
	"html"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func AddComments(commentRequest *models.CommentRequest) (*models.PostsResponse, error) {
	err := utils.ValidateComment(commentRequest)
	if err != nil {
		return nil, errors.New("validating comment:")
	}
	if len(commentRequest.ImgContant) != 0 {
		commentRequest.ImageUrl, err = utils.SaveImg(commentRequest.ImgContant)
		if err != nil {
			return nil, errors.New("field to save image")
		}
	}
	groupId := repo.GetGroupIdFromPost(commentRequest.TargetId)
	commentRequest.GroupId = groupId
	if commentRequest.GroupId != 0 && !repo.CheckUserInGroup(commentRequest.GroupId, commentRequest.UserId) {
		return nil, errors.New("you can't comment in this group")
	}
	commentRequest.Content = html.EscapeString(commentRequest.Content)
	card, err := repo.AddComment(commentRequest)
	if err != nil {
		return nil, errors.New("adding comment in db:")
	}
	return repo.GetOneCard(card, commentRequest.UserId)
}

func GetComments(CommentResponse *[]models.CommentResponse, userId int, cardId int) error {
	err := repo.GetComments(CommentResponse, userId, cardId)
	if err != nil {
		return errors.New("Error getting comments")
	}
	return nil
}
