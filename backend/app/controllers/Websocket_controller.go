package controllers

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

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
	if username == "" {
		log.Println("User not found")
		conn.Close()
		return
	}
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
		return service.SendMessageuser(msg, client)
	case "messageGroup":
		return service.SendMessageGroup(msg, client)
	case "getmessagesusers":
		return repo.Getmessagesusers(msg, client)
	case "getmessagesgroup":
		return repo.Getmessagesgroups(msg, client)
	case "changeunreadnotification":
		err := repo.ChangeUnreadNotification(msg, client)
		if err != nil {
			return err
		}
		Notification(client)
	case "changeunreadmessage":
		err := repo.ChangeUnreadMessage(msg, client)
		if err != nil {
			return err
		}
		return nil
	case "GETonlineStatus":
		return OnlineStatus(msg, client)
	case "GetNotification":
		return Notification(client)
	case "follow":
		return sendNotification(msg)
	case "changeunreadmessagegroupe":
		return repo.ChangeUnreadMessageGroup(msg, client)
	default:
		return fmt.Errorf("Invalid message type: %s", msg.Type)
	}
	return nil
}

func sendNotification(msg models.Message) error {
	receiverId, err := strconv.Atoi(msg.Receivers[0])
	if err != nil {
		return err
	}
	GetNotificationCount, err := repo.GetNotificationCount(receiverId)
	if err != nil {
		return err
	}
	receiverConn := models.Clients[repo.GetNickName(receiverId)]
	if receiverConn != nil {
		receiverConn.Conn.WriteJSON(map[string]interface{}{
			"type":              "Notification",
			"countNotification": GetNotificationCount,
		})
	}
	return nil
}

func Notification(client *models.Client) error {
	GetNotificationCount, err := repo.GetNotificationCount(client.Userid)
	if err != nil {
		return err
	}
	GetunreadmessagesCount, err := repo.GetunreadmessagesCount(client.Userid)
	if err != nil {
		return err
	}
	err = client.Conn.WriteJSON(map[string]interface{}{
		"type":                "Notification",
		"countNotification":   GetNotificationCount,
		"countunreadmessages": GetunreadmessagesCount,
	})
	if err != nil {
		RemoveClient(client.Conn)
	}
	return nil
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

func OnlineStatus(msg models.Message, client *models.Client) error {
	onlineUsers := []string{}
	for username := range models.Clients {
		if username != client.Username {
			onlineUsers = append(onlineUsers, username)
		}
	}
	err := client.Conn.WriteJSON(map[string]interface{}{
		"type":        "onlineStatus",
		"onlineUsers": onlineUsers,
	})
	if err != nil {
		return err
	}
	return nil
}
