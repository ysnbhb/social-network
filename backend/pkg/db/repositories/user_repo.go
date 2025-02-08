package repo

import (
	"errors"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetUserByEmail(email , nickname string) error {
    query := `SELECT u.email, u.nickname FROM users u WHERE email = ? or nickname=?`

    var existingEmail string
    var existingnickname string
    db.DB.QueryRow(query, email,nickname).Scan(&existingEmail,&existingnickname)
    if existingEmail != "" {
		return errors.New("user email already exists")
	}else if existingnickname != "" {
		return errors.New("user nickname already exists")
	}
	return nil
}

func GetUserByNickName(nickname string) error {
	return errors.New("user nickname already exist")
}

func CreateUser(user models.User) error {
	query := `INSERT INTO users (email, password_hash, first_name, last_name, date_of_birth, nickname) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := db.DB.Exec(query, user.Email, user.Password, user.FirstName, user.LastName, user.DateOfBirth, user.NickName)
	if err != nil {
		return err
	}
	return nil
}
