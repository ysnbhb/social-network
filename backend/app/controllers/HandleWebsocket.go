package controllers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	service "social-network/app/services"
	repo "social-network/pkg/db/repositories"
	models "social-network/pkg/models"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func HandleWebsocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to upgrade connection:", err)
		return
	}
	defer conn.Close()
	defer RemoveClient(conn)
	userID := r.Context().Value("userId").(int)
	username := repo.GetNickName(userID)
	AddClient(conn, userID, username)

	Notification(models.Clients[username])
	HandleMessages(models.Clients[username])
}

func HandleMessages(client *models.Client) {
	for {
		var msg models.Message
		err := client.Conn.ReadJSON(&msg)
		if err != nil {
			log.Println("Failed to read message:", err)
			break
		}
		err = Handlemessagetype(msg, client)
		if err != nil {
			log.Println("Failed to handle message:", err)
			continue
		}
	}
}

func Handlemessagetype(msg models.Message, client *models.Client) error {
	switch msg.Type {
	case "messageuser":
		service.SendMessageuser(msg, client)
	case "messageGroup":
		service.SendMessageGroup(msg, client)
	case "follow":
		service.SendFollow(msg, client)
	case "requestinvitationgroup":
		service.SendRequestInvitationgroup(msg, client)
	case "acceptedinvitationgroup":
		service.SendAcceptedInvitationGroup(msg, client)
	case "acceptedinvitationuser":
		service.SendAcceptedInvitationUser(msg, client)
	case "eventcreated":
		service.SendEventCreated(msg, client)
	case "typing":
		service.SendTyping(msg, client)
	case "getmessagesusers":
		repo.Getmessagesusers(msg, client)
	case "getmessagesgroup":
		repo.Getmessagesgroups(msg, client)
	case "changeunreadnotification":
		repo.ChangeUnreadNotification(msg, client)
	default:
		return fmt.Errorf("Invalid message type: %s", msg.Type)
	}
	return nil
}

func Notification(client *models.Client) {
	dataNotification, err := repo.GetUnreadNotification(client.Userid)

	if err == nil {
		err = client.Conn.WriteJSON(map[string]interface{}{
			"type": "Notification",
			"Data": dataNotification,
		})
		if err != nil {
			RemoveClient(client.Conn)
		}
	}
	// ???????????
}

func AddClient(conn *websocket.Conn, userID int, username string) {
	models.Mu.Lock()
	defer models.Mu.Unlock()
	if username != "" {
		models.Clients[username] = &models.Client{
			Conn:     conn,
			Userid:   userID,
			Username: username,
		}
	}
	BroadcastOnlineUsers()
}

func RemoveClient(conn *websocket.Conn) {
	models.Mu.Lock()
	defer models.Mu.Unlock()

	var username string
	for user, client := range models.Clients {
		if client.Conn == conn {
			username = user
			break
		}
	}
	delete(models.Clients, username)
	BroadcastOnlineUsers()
}

func BroadcastOnlineUsers() {
	for _, client := range models.Clients {
		otherUsers := []string{}
		for username := range models.Clients {
			if username != client.Username {
				otherUsers = append(otherUsers, username)
			}
		}
		data := map[string]interface{}{
			"type":        "onlineStatus",
			"onlineUsers": otherUsers,
		}
		err := client.Conn.WriteJSON(data)
		if err != nil {
			client.Conn.Close()
			delete(models.Clients, client.Username)
		}
	}
}
