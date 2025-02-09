package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateSession(session *models.Session) error {
	query := `INSERT INTO users (user_id, user_uuid, expires_at,) VALUES (?, ?, ?)`
	_, err := db.DB.Exec(query, session.UserId, session.UserUUID, session.ExpiresAt)
	if err != nil {
		return err
	}
	// id, err := result.LastInsertId()
	// if err != nil {
	// 	return err
	// }

	// session.Id = int(id)
	return nil
}


func GetUserIdBySession(sessionID string) (int, error) {
    var userId int
    query := `SELECT s.UserId FROM session s WHERE s.UserUUID = ?`
    err := db.DB.QueryRow(query, sessionID).Scan(&userId)
    if err != nil {
        return 0, err
    }
    return userId, nil
}