package services

import (
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func RegisterUser(user models.User) error {
	err := repo.GetUserByEmail(user.Email)
	return err
}
