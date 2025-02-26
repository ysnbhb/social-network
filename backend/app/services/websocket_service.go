package services

import (
	"html"
	"time"

	repo "social-network/pkg/db/repositories"
	models "social-network/pkg/models"
)

func SendMessageuser(msg models.Message, client *models.Client) error {
	err := repo.CheckCanUSendMessage(msg, client)
	if err != nil {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "you can't send message to this user: " + err.Error(),
		})
		return err
	}
	Time := time.Now().Format("2006-01-02 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	err = repo.Addmessages(msg, client)
	if err != nil {
		return err
	}
	receiverConn := models.Clients[msg.Receivers[0]]
	if receiverConn != nil {
		receiverConn.Conn.WriteJSON(map[string]interface{}{
			"type":    "messageuser",
			"sender":  client.Username,
			"content": msg.Content,
			"time":    Time,
		})
	}

	err = client.Conn.WriteJSON(map[string]interface{}{
		"type":    "messageuser",
		"sender":  client.Username,
		"content": msg.Content,
		"time":    Time,
		"mymsg":   true,
	})
	if err != nil {
		return err
	}

	err = repo.AddNotification(msg, client, "messageuser", Time) // add notification to db. ??
	if err != nil {
		return err
	}
	return nil
}

func SendMessageGroup(msg models.Message, client *models.Client) error {
	err := repo.CheckCanUSendMessageGroup(msg, client)
	if err != nil {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "you can't send message to this group: " + err.Error(),
		})
		return err
	}
	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	err = repo.AddmessagesGroup(msg, client)
	if err != nil {
		return err
	}
	for _, receiver := range msg.Receivers {
		receiverConn := models.Clients[receiver]
		if receiverConn != nil {
			receiverConn.Conn.WriteJSON(map[string]interface{}{
				"type":    "messageGroup",
				"sender":  client.Username,
				"content": msg.Content,
				"time":    Time,
				"groupid": msg.Groupid,
			})
		}
	}
	client.Conn.WriteJSON(map[string]interface{}{
		"type":    "messageGroup",
		"sender":  client.Username,
		"content": msg.Content,
		"time":    Time,
		"groupid": msg.Groupid,
	})

	err = repo.AddNotification(msg, client, "messageGroup", Time)
	if err != nil {
		return err
	}
	return nil
}

func SendFollow(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "follow")
}

func SendRequestInvitationgroup(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "requestinvitationgroup")
}

func SendAcceptedInvitationGroup(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "acceptedinvitationgroup")
}

func SendAcceptedInvitationUser(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "acceptedinvitationuser")
}

func SendEventCreated(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "eventcreated")
}

func SendTyping(msg models.Message, client *models.Client) error {
	return SendNotification(msg, client, "typing")
}

func SendNotification(msg models.Message, client *models.Client, Type string) error {
	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	err := repo.AddNotification(msg, client, Type, Time)
	if err != nil {
		return err
	}
	return nil
}
