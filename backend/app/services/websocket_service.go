package services

import (
	"fmt"
	"html"
	"time"

	repo "social-network/pkg/db/repositories"
	models "social-network/pkg/models"
)

func SendMessageuser(msg models.Message, client *models.Client) {
	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	err := repo.Addmessages(msg, client, Time)
	if err != nil {
		fmt.Println("error adding messageuser to db:")
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
	client.Conn.WriteJSON(map[string]interface{}{
		"type":    "messageuser",
		"sender":  client.Username,
		"content": msg.Content,
		"time":    Time,
	})
	
	err = repo.AddNotification(msg, client, "messageuser", Time)
	if err != nil {
		fmt.Println("error adding notification messageuser to db:")
	}
}

func SendMessageGroup(msg models.Message, client *models.Client) {
	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	if len(msg.Content) > 250 {
		client.Conn.WriteJSON(map[string]interface{}{
			"type":    "error",
			"content": "message is too long",
		})
	}
	err := repo.AddmessagesGroup(msg, client, Time)
	if err != nil {
		fmt.Println("error adding messagegroup to db:")
	}
	for _, receiver := range msg.Receivers {
		receiverConn := models.Clients[receiver]
		if receiverConn != nil {
			receiverConn.Conn.WriteJSON(map[string]interface{}{
				"type":    "messageGroup",
				"sender":  client.Username,
				"content": msg.Content,
				"time":    Time,
				"groupid":	msg.Groupid,  
			})
		}
	}
	client.Conn.WriteJSON(map[string]interface{}{
		"type":    "messageGroup",
		"sender":  client.Username,
		"content": msg.Content,
		"time":    Time,
		"groupid":	msg.Groupid,
	})
	
	err = repo.AddNotification(msg, client, "messageGroup", Time)
	if err != nil {
		fmt.Println("error adding notification messageGroup to db:")
	}
}

func SendFollow(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "follow")
}

func SendRequestInvitationgroup(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "requestinvitationgroup")
}

func SendAcceptedInvitationGroup(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "acceptedinvitationgroup")
}

func SendAcceptedInvitationUser(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "acceptedinvitationuser")
}

func SendEventCreated(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "eventcreated")
}

func SendTyping(msg models.Message, client *models.Client) {
	SendNotification(msg, client, "typing")
}

func SendNotification(msg models.Message, client *models.Client, Type string) {
	Time := time.Now().Format("02/01/2006 15:04:05")
	msg.Content = html.EscapeString(msg.Content)
	err := repo.AddNotification(msg, client, Type, Time)
	if err != nil {
		fmt.Println("error adding notification to db:")
		return
	}
}
