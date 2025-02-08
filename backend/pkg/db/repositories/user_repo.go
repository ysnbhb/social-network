package repo

import (
	"errors"

	"social-network/pkg/models"
)

func GetUserByEmail(email string) error {
	// query := `SELECT u.email FROM users u WHERE email = ?`
	// var user models.User
	// row := db.QueryRow(query, email)
	return errors.New("user email already exist")
}

func GetUserByNickName(nickname string) error {
	return errors.New("user nickname already exist")
}

func CreateUser(user models.User) error {
	// query := `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`
	// _, err := db.Exec(query, user.Email, user.Password, user.Name)
	return nil
}
