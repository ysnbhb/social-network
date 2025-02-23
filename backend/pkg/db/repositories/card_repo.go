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

func CheckExistCard(cardId int) bool {
	exist := false
	query := `SELECT EXISTS(SELECT 1 FROM card WHERE id = ?)`
	db.DB.QueryRow(query, cardId).Scan(&exist)
	return exist
}

// func CkeckPostType(cardId int) string {
// 	typePost := ""
// 	query := `SELECT pri`
// 	return typePost
// }
