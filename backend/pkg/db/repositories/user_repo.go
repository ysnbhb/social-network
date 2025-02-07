package repo

import "errors"

func GetUserByEmail(email string) error {
	return errors.New("user email already exist")
}