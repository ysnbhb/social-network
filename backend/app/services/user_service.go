package services

import (
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func RegisterUser(user models.User) error {
	err := repo.GetUserByEmail(user.Email)
	if err != nil {
		return err
	}

	err = repo.GetUserByNickName(user.NickName)
	if err != nil {
		return err
	}

	err = repo.CreateUser(user)
	if err != nil {
		return err
	}
	
	return nil
}
