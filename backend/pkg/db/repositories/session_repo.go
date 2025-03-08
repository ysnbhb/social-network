package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateSession(session *models.Session) error {
	query1 := `DELETE FROM sessions WHERE user_id = ?`
	_, err := db.DB.Exec(query1, session.UserId)
	if err != nil {
		return err
	}
	query2 := `INSERT INTO sessions (user_id, user_uuid, expires_at) VALUES (?, ?, ?)`
	_, err = db.DB.Exec(query2, session.UserId, session.UserUUID, session.ExpiresAt)
	if err != nil {
		return err
	}
	return nil
}

func GetUserIdBySession(sessionID string) (int, string, error) {
	var userId int
	var username string
	query := `SELECT s.user_id , u.nickname FROM sessions s JOIN users u on u.id=s.user_id WHERE s.user_uuid = ?`
	err := db.DB.QueryRow(query, sessionID).Scan(&userId, &username)
	if err != nil {
		return 0, "", err
	}
	return userId, username, nil
}
