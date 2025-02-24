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

func GetUserIdBySession(sessionID string) (int, error) {
    var userId int
    query := `SELECT s.user_id FROM sessions s WHERE s.user_uuid = ?`
    err := db.DB.QueryRow(query, sessionID).Scan(&userId)
    if err != nil {
        return 0, err
    }
    return userId, nil
}