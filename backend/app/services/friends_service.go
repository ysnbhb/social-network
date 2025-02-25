package services

import (
	"log"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetFriendsService(userId int) []models.Friends {
	var friends []models.Friends
	err := repo.GetFriends(&friends, userId)
	if err != nil {
		log.Println("Get Friends:", err)
		return nil
	}
	return friends
}
