package repo

import (
	"errors"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CheckEmailNickname(email, nickname string) error {
    query := `SELECT u.email, u.nickname FROM users u WHERE email = ? OR nickname = ?`

    var existingEmail, existingNickname string

 	db.DB.QueryRow(query, email, nickname).Scan(&existingEmail, &existingNickname)

    if existingEmail != "" {
        return errors.New("user email already exists")
    }

    if existingNickname != "" {
        return errors.New("user nickname already exists")
    }

	return nil
}

// func GetUserByNickName(nickname string) error {
// 	return errors.New("user nickname already exist")
// }

func CreateUser(user *models.User) error {
	query := `INSERT INTO users (email, password_hash, first_name, last_name, date_of_birth, nickname) VALUES (?, ?, ?, ?, ?, ?)`
	result, err := db.DB.Exec(query, user.Email, user.Password, user.FirstName, user.LastName, user.DateOfBirth, user.NickName)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	user.Id = int(id)
	return nil
}
