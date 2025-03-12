package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetUsersByNikename(searchContent string, userId int) ([]models.UserBySearch, error) {
	var users []models.UserBySearch

	query := `SELECT id, first_name, last_name, nickname, avatar_url FROM users WHERE nickname LIKE ? AND id != ?`
	rows, err := db.DB.Query(query, "%"+searchContent+"%", userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var user models.UserBySearch
		err := rows.Scan(
			&user.Id,
			&user.FirstName,
			&user.LastName,
			&user.Nickname,
			&user.Avatar,
		)
		if err != nil {
			continue
		}
		users = append(users, user)
	}
	return users, nil
}
