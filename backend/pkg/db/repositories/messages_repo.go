package repo

import (
	"errors"
	"fmt"
	"time"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CheckCanUSendMessage(Receivers string, Userid int) error {
	recieverid := GetUserIdByNickName(Receivers)
	if recieverid < 0 {
		return errors.New("User not found")
	}
	query1 := "SELECT profile_type FROM users WHERE id = ?"
	var profileType string
	err := db.DB.QueryRow(query1, recieverid).Scan(&profileType)
	if err != nil {
		return errors.New("User not found")
	}
	if profileType == "private" {
		query2 := "SELECT COUNT(*) FROM followers WHERE follower_id = ? AND following_id = ? OR following_id = ? AND follower_id = ?"
		var count int
		err := db.DB.QueryRow(query2, Userid, recieverid, Userid, recieverid).Scan(&count)
		if err != nil {
			return err
		}
		if count == 0 {
			return errors.New("You are not following this user")
		}
	}
	return nil
}

func Addmessages(msg models.Message, client *models.Client) error {
	recieverid := GetUserIdByNickName(msg.Receivers[0])
	query := "INSERT INTO chats (sender_id, recipient_id, message) VALUES (?, ?, ?)"
	_, err := db.DB.Exec(query, client.Userid, recieverid, msg.Content)
	if err != nil {
		return err
	}
	return nil
}

func CheckCanUSendMessageGroup(msg models.Message, client *models.Client) error {
	query := "SELECT COUNT(*) FROM group_members WHERE group_id = ? AND user_id = ?"
	var count int
	err := db.DB.QueryRow(query, msg.Groupid, client.Userid).Scan(&count)
	if err != nil {
		return err
	}
	if count == 0 {
		return errors.New("You are not a member of this group")
	}
	return nil
}

func AddmessagesGroup(msg models.Message, client *models.Client) error {
	query := "INSERT INTO group_chats (group_id, user_id, message, sent_at) VALUES (?, ?, ?)"
	_, err := db.DB.Exec(query, msg.Groupid, client.Userid, msg.Content)
	if err != nil {
		return err
	}
	return nil
}

func Getmessagesusers(msg models.Message, client *models.Client) error {
	recieverid := GetUserIdByNickName(msg.Receivers[0])
	query := `SELECT sender_id, recipient_id, message, sent_at FROM chats
			WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)
			ORDER BY sent_at DESC
			LIMIT ? OFFSET ?`
	rows, err := db.DB.Query(query, client.Userid, recieverid, recieverid, client.Userid, 10, msg.Offset)
	if err != nil {
		return err
	}
	defer rows.Close()

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

	client.Conn.WriteJSON(map[string]interface{}{
		"type":     "getmessagesusers",
		"messages": messages,
		"you":      GetNickName(client.Userid),
		"offset":   msg.Offset,
		"he":       msg.Receivers[0],
	})
	return nil
}

func Getmessagesgroups(msg models.Message, client *models.Client) error {
	query := `SELECT user_id, message, sent_at FROM group_chats
			WHERE group_id = ?
			ORDER BY timestamp ASC`
	rows, err := db.DB.Query(query, msg.Groupid)
	var messages []map[string]string
	for rows.Next() {
		var userid int
		var message string
		var timestamp time.Time
		err := rows.Scan(&userid, &message, &timestamp)
		if err != nil {
			fmt.Println("//////////////////////////////////////")
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

func ChangeUnreadMessage(msg models.Message, client *models.Client) error {
	query := `UPDATE notifications SET read_status = 'read' WHERE user_id = ? AND sender_id = ? AND type = ?`
	senderid := GetUserIdByNickName(msg.Sender)
	_, err := db.DB.Exec(query, client.Userid, senderid, "messageuser")
	if err != nil {
		return err
	}
	return nil
}
