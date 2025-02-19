package utils

import (
	"social-network/pkg/models"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	return nil
}

func ComparePassword(login *models.Login) error {
	err := bcrypt.CompareHashAndPassword([]byte(login.HashedPassword), []byte(login.Password))
	return err
}
