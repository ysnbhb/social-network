package repo

import (
	"time"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetNotification(userid int) ([]models.UnreadNotification, error) {
	query := `SELECT id, user_id, sender_id, COALESCE(group_id , 0),type, details, read_status, created_at FROM notifications WHERE user_id = ? AND type != 'messageuser' ORDER BY created_at DESC`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return []models.UnreadNotification{}, err
	}
	defer rows.Close()
	var data []models.UnreadNotification
	for rows.Next() {
		var Senderid int
		var Userid int
		var Sent_at time.Time
		var dataNotification models.UnreadNotification
		err := rows.Scan(&dataNotification.Id, &Userid, &Senderid, &dataNotification.GroupId, &dataNotification.Type, &dataNotification.Details, &dataNotification.Readstatus, &Sent_at)
		if err != nil {
			return []models.UnreadNotification{}, err
		}
		sender := GetNickName(Senderid)
		Username := GetNickName(Userid)
		dataNotification.Sender = sender
		dataNotification.Username = Username
		dataNotification.Sent_at = Sent_at.Format("2006-01-02 15:04:05")
		data = append(data, dataNotification)
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
		if Type != "messageuser" {
			receiverConn := models.Clients[receiver]
			if receiverConn != nil {
				receiverConn.Conn.WriteJSON(map[string]interface{}{
					"type":           Type,
					"sender":         client.Username,
					"content":        msg.Content,
					"time":           sent_at,
					"notificationid": id,
				})
			}
		}
	}
	return nil
}

func ChangeUnreadNotification(msg models.Message, client *models.Client) error {
	query := `UPDATE notifications SET read_status = 'read' WHERE id = ? `
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

func GetunreadmessagesCount(userid int) (int, error) {
	countQuery := `SELECT COUNT(*) FROM notifications WHERE user_id = ? AND read_status = 'unread' AND type = 'messageuser'`
	var messagesCount int
	err := db.DB.QueryRow(countQuery, userid).Scan(&messagesCount)
	if err != nil {
		return 0, err
	}
	return messagesCount, nil
}

func GetNotificationCount(userid int) (int, error) {
	countQuery := `SELECT COUNT(*) FROM notifications WHERE user_id = ? AND read_status = 'unread' AND type != 'messageuser'`
	var notificationCount int
	err := db.DB.QueryRow(countQuery, userid).Scan(&notificationCount)
	if err != nil {
		return 0, err
	}
	return notificationCount, nil
}

func AddNotificationFollow(userid int, receiverId int) error {
	query := `INSERT INTO notifications (user_id, sender_id, type, details) VALUES (?, ?, ?, ?)`
	_, err := db.DB.Exec(query, receiverId, userid, "follow", "You have a follow request from "+GetNickName(userid))
	if err != nil {
		return err
	}
	return nil
}

func AddNotificationMsgGroup(msg models.Message, client *models.Client, Type string, time string, mebber []models.GroupMember) error {
	query := `INSERT INTO notifications (user_id, sender_id, group_id, type, details) VALUES (?, ?, ?,?, ?)`
	for _, receiver := range mebber {
		_, err := db.DB.Exec(query, receiver.Id, client.Userid, msg.Groupid, Type, client.Username+" sent a message to the group"+GetgroupnameById(msg.Groupid))
		if err != nil {
			return err
		}
		receiverConn, ok := models.Clients[receiver.Nickname]
		if ok {
			GetNotificationCount, err := GetNotificationCount(receiver.Id)
			if err != nil {
				return err
			}
			receiverConn.Conn.WriteJSON(map[string]interface{}{
				"type":              "Notification",
				"countNotification": GetNotificationCount,
			})
		}
	}
	return nil
}
