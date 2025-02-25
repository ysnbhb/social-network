package utils

import (
	"errors"
	"net/mail"
	"regexp"

	"social-network/pkg/models"
)

func ValidateUser(user *models.User) error {
	firstName := regexp.MustCompile(`^[a-zA-Z]{3,10}$`)
	if !firstName.MatchString(user.FirstName) {
		return errors.New("invalid first name")
	}

	lastName := regexp.MustCompile(`^[a-zA-Z]{3,10}$`)
	if !lastName.MatchString(user.LastName) {
		return errors.New("invalid last name")
	}

	nickName := regexp.MustCompile(`^[a-zA-Z0-9][\w]{2,10}[a-zA-Z0-9]$`)
	if !nickName.MatchString(user.NickName) {
		return errors.New("invalid nickname")
	}

	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return errors.New("invalid email")
	}

	password := regexp.MustCompile(`^[a-zA-Z0-9][\w]{2,10}[a-zA-Z0-9]$`)
	if !password.MatchString(user.Password) {
		return errors.New("invalid password")
	}

	return nil
}
