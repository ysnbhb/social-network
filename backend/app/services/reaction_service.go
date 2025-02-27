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
	exist := repo.CheckExistCard(reactionRequest.CardId)
	if !exist {
		return errors.New("post not found")
	}
	postinfo, err := repo.GetPostInfo(reactionRequest.CardId)
	if postinfo.UserId != reactionRequest.UserId {
		groupId := postinfo.GroupId
		if groupId != 0 {
			exist := repo.CheckUserInGroup(groupId, reactionRequest.UserId)
			if !exist {
				return errors.New("you have to join to group first")
			}
		} else if postinfo.PrivacyType != "public" && postinfo.Privacy == "public" {
			if !repo.IsFollowing(reactionRequest.UserId, postinfo.UserId) {
				return errors.New("you have to follow the user first")
			}
		} else if postinfo.PrivacyType != "public" && postinfo.Privacy == "private" {
			if !repo.IsFollowing(reactionRequest.UserId, postinfo.UserId) {
				return errors.New("you have to follow the user first")
			} else if !repo.AllToSee(reactionRequest.UserId, postinfo.UserId) {
				return errors.New("you can not see this post")
			}
		} else if (postinfo.PrivacyType == "public" || postinfo.PrivacyType != "public") && postinfo.Privacy == "almostPrivate" {
			if !repo.IsFollowing(reactionRequest.UserId, postinfo.UserId) {
				return errors.New("you have to follow the user first")
			}
		}
	}
	err = repo.AddReaction(reactionRequest)
	if err != nil {
		return errors.New("adding reaction to db: " + err.Error())
	}
	return nil
}

func GetReactionCounts(reactionRequest *models.ReactionRequest) (likes, dislikes int, isliked bool) {
	return repo.GetReactionCounts(reactionRequest.CardId, reactionRequest.UserId)
}
