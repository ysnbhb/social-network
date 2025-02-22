package repo

import (
	"time"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func Addmessages(msg models.Message, client *models.Client, sent_at string) error {
	recieverid := GetUserIdByNickName(msg.Receivers[0])
	query := "INSERT INTO messages (sender_id, recipient_id, message, sent_at) VALUES (?, ?, ?, ?)"
	_, err := db.DB.Exec(query, client.Userid, recieverid, msg.Content, sent_at)
	if err != nil {
		return err
	}
	return nil
}

func AddmessagesGroup(msg models.Message, client *models.Client, sent_at string) error {
	query := "INSERT INTO group_chats (group_id, user_id, message, sent_at) VALUES (?, ?, ?, ?)"
	_, err := db.DB.Exec(query, msg.Groupid, client.Userid, msg.Content, sent_at)
	if err != nil {
		return err
	}
	return nil
}

func Getmessagesusers(msg models.Message, client *models.Client) error {
	recieverid := GetUserIdByNickName(msg.Receivers[0])
	query := `SELECT sender_id, recipient_id, message, sent_at FROM messages
			WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
			ORDER BY timestamp DESC`
	rows, err := db.DB.Query(query, client.Userid, recieverid, recieverid, client.Userid)
	var messages []map[string]string
	for rows.Next() {
		var sender, receiver int
		var message string
		var timestamp time.Time
		err := rows.Scan(&sender, &receiver, &message, &timestamp)
		if err != nil {
			return err
		}
		messages = append(messages, map[string]string{
			"sender":    GetNickName(sender),
			"receiver":  GetNickName(receiver),
			"message":   message,
			"timestamp": timestamp.Format("2006-01-02 15:04:05"),
		})
	}
	if err != nil {
		return err
	}
	client.Conn.WriteJSON(map[string]interface{}{
		"type":     "getmessagesusers",
		"messages": messages,
	})
	return nil
}

func Getmessagesgroups(msg models.Message, client *models.Client) error {
	query := `SELECT user_id, message, sent_at FROM group_chats
			WHERE group_id = ?
			ORDER BY timestamp DESC`
	rows, err := db.DB.Query(query, msg.Groupid)
	var messages []map[string]string
	for rows.Next() {
		var userid int
		var message string
		var timestamp time.Time
		err := rows.Scan(&userid, &message, &timestamp)
		if err != nil {
			return err
		}
		sender := GetNickName(userid)
		messages = append(messages, map[string]string{
			"sender":    sender,
			"message":   message,
			"timestamp": timestamp.Format("2006-01-02 15:04:05"),
		})
	}
	if err != nil {
		return err
	}
	client.Conn.WriteJSON(map[string]interface{}{
		"type":     "getmessagesgroups",
		"messages": messages,
	})
	return nil
}
