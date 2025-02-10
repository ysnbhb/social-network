package repo

import (
	db "social-network/pkg/db/sqlite"
)

func CreateCard(userId, groupId int, content, imageUrl string) (int, error) {
	query := `INSERT INTO card (user_id, group_id, content, image_url) VALUES (?, ?, ?, ?)`
	result, err := db.DB.Exec(query, userId, groupId, content, imageUrl)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}
