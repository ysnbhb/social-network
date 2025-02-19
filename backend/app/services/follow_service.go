package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) error {
	
	err := repo.AddFollow(followRequest)
	if err != nil {
		return errors.New("Follow User in db: " + err.Error())
	}
	return nil
}
