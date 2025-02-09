package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateSession(session *models.Session) error {
	query := `INSERT INTO users (user_id, user_uuid, expires_at,) VALUES (?, ?, ?)`
	_, err := db.DB.Exec(query, session.UserId, session.UserId, session.ExpiresAt)
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
