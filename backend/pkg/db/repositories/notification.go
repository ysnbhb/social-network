package repo

import db "social-network/pkg/db/sqlite"

type Data struct {
	Type    string
	Details string
}

func GetUnreadNotification(userid int) ([]Data, error) {
	query := `SELECT type, details FROM notifications WHERE user_id = ? AND is_read = unread`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return []Data{}, err
	}
	defer rows.Close()
	var data []Data
	for rows.Next() {
		var dataNotification Data
		err := rows.Scan(&dataNotification.Type, &dataNotification.Details)
		data = append(data, dataNotification)
		if err != nil {
			return []Data{}, err
		}
	}
	return data, nil
}
