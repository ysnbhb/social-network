package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) error {
	profile_type := repo.GetStatusUesr(followRequest.FollowingId)
	if (profile_type == "Not Found") {
		return errors.New("user not found")
	}else if profile_type == "private" {
		followRequest.Status = "pending"
	}else {
		followRequest.Status = "accept"
	}
	err := repo.AddFollow(followRequest)
	if err != nil {
		return errors.New("Follow User in db: " + err.Error())
	}
	return nil
}
