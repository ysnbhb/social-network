package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) (bool, error) {
	profile_type := repo.GetStatusUesr(followRequest.FollowingId)
	if profile_type == "Not Found" {
		return false, errors.New("user not found")
	} else if profile_type == "Private" {
		followRequest.Status = "pending"
	} else {
		followRequest.Status = "accept"
	}
	exists,err := repo.AddFollow(followRequest)
	if err != nil {
		return false, errors.New("Follow User in db: " + err.Error())
	}
	return exists,nil
}

func GetFollowers(userId int) ([]models.UnfollowUser, error) {
	users, err := repo.GetFollowers(userId)
	if err != nil {
		return nil, errors.New("field to get users")
	}
	return users, nil
}

