package services

import (
	"html"
	"log"
	"time"

	repo "social-network/pkg/db/repositories"
	models "social-network/pkg/models"

	"github.com/gorilla/websocket"
)

func SendMessageuser(msg models.Message, client *models.Client, conn *websocket.Conn) error {
	err := repo.CheckCanUSendMessage(msg.Receivers[0], client.Userid)
	if err != nil {
		conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "you can't send message to this user: " + err.Error(),
		})
		return err
	}
	Time := time.Now().Format("2006-01-02 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	err = repo.Addmessages(msg, client)
	if err != nil {
		return err
	}
	err = repo.AddNotification(msg, client, "messageuser", Time) // add notification to db. ??
	if err != nil {
		return err
	}
	avatar_url := repo.GetAvatarUrl(client.Userid)
	receiverConns, ok := models.Clients[msg.Receivers[0]]
	if ok {
		for _, receiverConn := range receiverConns.Connections {
			if receiverConn != nil {
				err = receiverConn.WriteJSON(map[string]interface{}{
					"type":       "messageuser",
					"sender":     client.Username,
					"avatar_url": avatar_url,
					"content":    msg.Content,
					"time":       Time,
					"you":        receiverConn,
				})
				if err != nil {
					log.Println("Error sending message to a connection:", err)
				}
			}
		}
	}

	err = conn.WriteJSON(map[string]interface{}{
		"type":       "messageuser",
		"sender":     client.Username,
		"avatar_url": avatar_url,
		"content":    msg.Content,
		"time":       Time,
		"mymsg":      true,
		"you":        repo.GetNickName(client.Userid),
	})
	if err != nil {
		return err
	}
	return nil
}

func SendMessageGroup(msg models.Message, client *models.Client, conn *websocket.Conn) error {
	err := repo.CheckCanUSendMessageGroup(msg, client)
	if err != nil {
		conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "you can't send message to this group: " + err.Error(),
		})
		return err
	}

	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}

	err = repo.AddmessagesGroup(msg, client)
	if err != nil {
		return err
	}

	users, err, _ := MemberGroup(msg.Groupid, client.Userid)
	if err != nil {
		return err
	}

	avatar_url := repo.GetAvatarUrl(client.Userid)
	for _, receiver := range users {
		receiverConns, exists := models.Clients[receiver.Nickname]
		if exists && receiverConns != nil {
			for _, receiverConn := range receiverConns.Connections {
				if receiverConn != nil {
					receiverConn.WriteJSON(map[string]interface{}{
						"type":       "messageGroup",
						"sender":     client.Username,
						"content":    msg.Content,
						"avatar_url": avatar_url,
						"time":       Time,
						"groupid":    msg.Groupid,
						"you":        receiverConn,
					})
				}
			}
		}
	}
	conn.WriteJSON(map[string]interface{}{
		"type":       "messageGroup",
		"sender":     client.Username,
		"content":    msg.Content,
		"avatar_url": avatar_url,
		"time":       Time,
		"groupid":    msg.Groupid,
		"mymsg":      true,
		"you":        repo.GetNickName(client.Userid),
	})

	err = repo.AddNotificationMsgGroup(msg, client, "messageGroup", Time, users)
	if err != nil {
		log.Println("Error adding notification:", err)
		return err
	}
	return nil
}
