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
	sendersList, err := repo.GetNotificationBytype(userId, "messageuser")
	if err != nil {
		log.Println("Get Notification:", err)
		return nil
	}

	for i := range friends {
		for _, sender := range sendersList {
			if sender == friends[i].Nickname {
				friends[i].Sendmessage = true
				break
			}
		}
	}
	return friends
}
