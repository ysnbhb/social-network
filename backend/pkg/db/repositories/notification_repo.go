package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

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

func AddNotification(msg models.Message, client *models.Client, Type string, sent_at string) error {
	query := `INSERT INTO notifications (user_id, sender_id, type, details) VALUES (?, ?, ?, ?)`
	for _, receiver := range msg.Receivers {
		recieverid := GetUserIdByNickName(receiver)
		_, err := db.DB.Exec(query, recieverid, client.Userid, Type, msg.Content)
		if err != nil {
			return err
		}
		query = `SELECT id FROM notifications WHERE user_id = ? AND sender_id = ? AND type = ? AND details = ?`
		var id int
		err = db.DB.QueryRow(query, recieverid, client.Userid, Type, msg.Content).Scan(&id)
		if err != nil {
			return err
		}
		receiverConn := models.Clients[receiver]
		if receiverConn != nil {
			receiverConn.Conn.WriteJSON(map[string]interface{}{
				"type":               "Notification",
				"typeOFnotification": Type,
				"sender":             client.Username,
				"content":            msg.Content,
				"time":               sent_at,
				"notificationid":     id,
			})
		}
	}
	return nil
}

func ChangeUnreadNotification(msg models.Message, client *models.Client) error {
	query := `UPDATE notifications SET read_status = read WHERE id = ? `
	_, err := db.DB.Exec(query, msg.Notificationid)
	if err != nil {
		return err
	}
	return nil
}

func GetNotificationBytype(userid int, Type string) ([]string, error) {
	query := `SELECT sender_id FROM notifications WHERE user_id = ? AND type = ? AND read_status = 'unread'`
	rows, err := db.DB.Query(query, userid, Type)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var senders []string
	for rows.Next() {
		var sender_id int
		err := rows.Scan(&sender_id)
		if err != nil {
			return nil, err
		}
		sender := GetNickName(sender_id)
		senders = append(senders, sender)
	}
	return senders, nil
}
