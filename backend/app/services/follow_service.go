package services

import (
	"errors"
	"log"

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
	exists, err := repo.AddFollow(followRequest)
	if err != nil {
		return false, errors.New("Follow User in db: " + err.Error())
	}
	err = repo.AddNotificationFollow(exists, followRequest.FollowerId, followRequest.FollowingId)
	if err != nil {
		log.Println("Add Notification in db:", err)
		return false, errors.New("filed to add notification")
	}
	return exists, nil
}

func GetFollowers(userId int) ([]models.UnfollowUser, error) {
	users, err := repo.GetFollowers(userId)
	if err != nil {
		return nil, errors.New("field to get users")
	}
	return users, nil
}

func AcceptFollow(userId int, follower string) error {
	err := repo.AcceptFollow(userId, follower)
	if err != nil {
		return errors.New("field to accept follow")
	}
	err = repo.Updatenotification(userId, follower, "accept", nil)
	return nil
}

func RejectFollow(userId int, follower string) error {
	err := repo.RejectFollow(userId, follower)
	if err != nil {
		return errors.New("field to reject follow")
	}
	err = repo.Updatenotification(userId, follower, "reject", nil)
	if err != nil {
		return errors.New("field to update notification")
	}
	return nil
}
