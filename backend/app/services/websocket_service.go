package services

import (
	"html"
	"time"

	models "social-network/pkg/models"
)

func SendMessageuser(msg models.Message, client *models.Client) {
	Time := time.Now()
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	receiverConn := models.Clients[msg.Receiver]
	if receiverConn != nil {
		receiverConn.Conn.WriteJSON(map[string]interface{}{
			"type":    "message",
			"sender":  client.Username,
			"content": msg.Content,
			"time":    Time.Format("02/01/2006 15:04:05"),
		})
	}
	client.Conn.WriteJSON(map[string]interface{}{
		"type":    "message",
		"sender":  client.Username,
		"content": msg.Content,
		"time":    Time.Format("02/01/2006 15:04:05"),
	})
}

func SendMessageGroup(msg models.Message, client *models.Client) {
}

func SendFollow(msg models.Message, client *models.Client) {
}

func SendRequestInvitationgroup(msg models.Message, client *models.Client) {
}

func SendAcceptedInvitationGroup(msg models.Message, client *models.Client) {
}

func SendAcceptedInvitationUser(msg models.Message, client *models.Client) {
}

func SendEventCreated(msg models.Message, client *models.Client) {
}

func SendTyping(msg models.Message, client *models.Client) {
}
