package auth

import (
	"github.com/gofrs/uuid"
)

func GenerateSessionID() (string, error) {
	id, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	return id.String(), nil
}

func AuthenticateUser(username, password string) (string, error) {
	sessionID, err := GenerateSessionID()
	if err != nil {
		return "", err
	}
	return sessionID, nil
}

// func ValidateUUID(uuidStr string) bool {
// 	_, err := uuid.(uuidStr)
// 	return err == nil
// }
