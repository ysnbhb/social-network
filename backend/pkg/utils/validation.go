package utils

import (
	"errors"

	"social-network/pkg/models"
)

func ValidateUser(user *models.User) error {
	// nickname valodate
	// r := regexp.MustCompile(`/^[a-zA-Z0-9][\w]{2,10}[a-zA-Z0-9]$/mig`)

	return errors.New("testing")
}
