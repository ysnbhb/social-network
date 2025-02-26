package repo

import (
	"errors"
	"log"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateUser(user *models.User) error {
	query := `INSERT INTO users (email, password_hash, first_name, last_name, date_of_birth, nickname,avatar_url, about_me,profile_type) VALUES (?, ?, ?, ?, ?, ?,?,?,?)`
	result, err := db.DB.Exec(query, user.Email, user.Password, user.FirstName, user.LastName, user.DateOfBirth, user.NickName, user.AvatarUrl, user.AboutMe, user.Profile_Type)
	if err != nil {
		log.Println(err)
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		log.Println(err)
		return err
	}

	user.Id = int(id)
	return nil
}

func CheckEmail(email string) error {
	var exists bool
	query := "SELECT EXISTS (select email from users where email=?)"
	err := db.DB.QueryRow(query, email).Scan(&exists)
	if err != nil || exists {
		log.Println(err)
		return errors.New("user email already exists")
	}

	return nil
}

func GetUserId(login *models.Login) {
	query := `SELECT u.id FROM users u WHERE email = ?`
	var userId int

	db.DB.QueryRow(query, login.Email).Scan(&userId)
	login.Id = userId
}

func CheckNickName(nickname string) error {
	query := `SELECT u.nickname FROM users u WHERE nickname = ?`
	var existingNickname string

	db.DB.QueryRow(query, nickname).Scan(&existingNickname)
	if existingNickname != "" {
		log.Println(errors.New("user nickname already exist"))
		return errors.New("user nickname already exist")
	}
	return nil
}

func GetPassword(login *models.Login) {
	query := `SELECT u.password_hash FROM users u WHERE email = ?`
	var hashedPassword string

	db.DB.QueryRow(query, login.Email).Scan(&hashedPassword)
	login.HashedPassword = hashedPassword
}

func DeleteSessionUser(userId int) error {
	query := `DELETE FROM sessions WHERE user_id = ?`

	_, err := db.DB.Exec(query, userId)
	if err != nil {
		return err
	}
	return nil
}

func CheckUserExist(userId int) bool {
	exist := false
	query := `SELECT EXISTS (
		SELECT 1 FROM users WHERE id = ?
	)`
	db.DB.QueryRow(query, userId).Scan(&exist)
	return exist
}

func GetNickName(userId int) string {
	query := `SELECT u.nickname FROM users u WHERE id = ?`
	var nickname string
	db.DB.QueryRow(query, userId).Scan(&nickname)
	return nickname
}

func GetUserIdByNickName(nickname string) int {
	query := `SELECT u.id FROM users u WHERE nickname = ?`
	var userId int
	err := db.DB.QueryRow(query, nickname).Scan(&userId)
	if err != nil {
		return -1
	}
	return userId
}
