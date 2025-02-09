package utils

import (
	"errors"
	"social-network/pkg/models"
)

func ValidateReaction(reactionRequest *models.ReactionRequest) error {

	if reactionRequest.ReactionType != -1 && reactionRequest.ReactionType != 1 {
		return errors.New("reactionType must be one of the following values: -1 (dislike), 1 (like)")
	}

	return nil
	
}
