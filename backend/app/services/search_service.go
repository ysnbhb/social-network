package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func SearchUsersByContent(searchContent string, userId int) ([]models.UserBySearch, error) {
	users, err := repo.GetUsersByNikename(searchContent, userId)
	if err != nil {
		return nil, errors.New("failed to search users by nickname: " + err.Error())
	}

	return users, nil
}
