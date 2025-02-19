package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) error {
	FollowingId := repo.CheckExtsUser(followRequest.FollowingId)
	if !FollowingId {
		return errors.New("This User Is Not Exist")
	}
	err := repo.AddFollow(followRequest)
	if err != nil {
		return errors.New("Follow User in db: " + err.Error())
	}
	return nil
}
