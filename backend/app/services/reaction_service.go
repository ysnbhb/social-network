package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func AddReaction(reactionRequest *models.ReactionRequest) error {
	err := utils.ValidateReaction(reactionRequest)
	if err != nil {
		return errors.New("validating reaction: " + err.Error())
	}
	groupId := repo.GetGroupIdFromPost(reactionRequest.CardId)
	if groupId != 0 {
		exist := repo.CheckUserInGroup(groupId, reactionRequest.UserId)
		if !exist {
			return errors.New("you have to join to group first")
		}
	}
	exist := repo.CheckExistCard(reactionRequest.CardId)
	if !exist {
		return errors.New("post not found")
	}
	err = repo.AddReaction(reactionRequest)
	if err != nil {
		return errors.New("adding reaction to db: " + err.Error())
	}
	return nil
}

func GetReactionCounts(reactionRequest *models.ReactionRequest) (likes, dislikes int) {
	return repo.GetReactionCounts(reactionRequest.CardId)
}
