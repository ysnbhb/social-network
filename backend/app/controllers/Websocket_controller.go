package controllers

import (
	"encoding/json"
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
		log.Printf("Error upgrading connection: %v", err)
		http.Error(w, "Failed to establish WebSocket connection", http.StatusInternalServerError)
		return
	}
	userID, ok := r.Context().Value("userId").(int)
	if !ok {
		log.Println("Error: User ID not provided in request context")
		conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseInternalServerErr, "Authentication error"))
		conn.Close()
		return
	}

	username := repo.GetNickName(userID)
	if username == "" {
		log.Printf("Error: User with ID %d not found", userID)
		conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "User not found"))
		conn.Close()
		return
	}
	defer func() {
		// log.Printf("Closing connection for user: %s (ID: %d)", username, userID)
		RemoveClient(conn)
		conn.Close()
	}()
	AddClient(conn, userID, username)
	Notification(username)
	HandleClientConnection(conn, username)
}

func HandleClientConnection(conn *websocket.Conn, username string) {
	client := models.Clients[username]

	for {
		_, messageData, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var msg models.Message
		if err := json.Unmarshal(messageData, &msg); err != nil {
			log.Println("Invalid message format:", err)
			continue
		}

		err = Handlemessagetype(msg, client, conn)
		if err != nil {
			log.Println("Failed to handle message:", err)
			continue
		}
	}
}
// , conn *websocket.Conn
func Handlemessagetype(msg models.Message, client *models.Client, conn *websocket.Conn) error {
	switch msg.Type {
	case "messageuser":
		return service.SendMessageuser(msg, client, conn)
	case "messageGroup":
		return service.SendMessageGroup(msg, client, conn)
	case "getmessagesusers":
		return repo.Getmessagesusers(msg, client, conn)
	case "getmessagesgroup":
		return repo.Getmessagesgroups(msg, client, conn)
	case "changeunreadnotification":
		err := repo.ChangeUnreadNotification(msg)
		if err != nil {
			return err
		}
		Notification(client.Username)
	case "changeunreadmessage":
		err := repo.ChangeUnreadMessage(msg, client)
		if err != nil {
			return err
		}
		return nil
	case "GETonlineStatus":
		return OnlineStatus(msg, client, conn)
	case "GetNotification":
		return Notification(client.Username)
	case "follow":
		return sendNotification(msg)
	case "changeunreadmessagegroupe":
		return repo.ChangeUnreadMessageGroup(msg, client)
	case "closeconnection":
		RemoveClient(conn)
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
	GetunreadmessagesCount, err := repo.GetunreadmessagesCount(receiverId)
	if err != nil {
		return err
	}

	notification := map[string]interface{}{
		"type":                "Notification",
		"countNotification":   GetNotificationCount,
		"countunreadmessages": GetunreadmessagesCount,
	}
	receiverConns := models.Clients[repo.GetNickName(receiverId)]
	if receiverConns != nil {
		for _, receiverConn := range receiverConns.Connections {
			receiverConn.WriteJSON(notification)
		}
	}
	return nil
}

func Notification(username string) error {
	client, exists := models.Clients[username]
	if !exists || len(client.Connections) == 0 {
		return fmt.Errorf("user %s not connected", username)
	}

	GetNotificationCount, err := repo.GetNotificationCount(client.Userid)
	if err != nil {
		return err
	}

	GetunreadmessagesCount, err := repo.GetunreadmessagesCount(client.Userid)
	if err != nil {
		return err
	}

	notification := map[string]interface{}{
		"type":                "Notification",
		"countNotification":   GetNotificationCount,
		"countunreadmessages": GetunreadmessagesCount,
	}

	// Send to all connections for this user
	for _, conn := range client.Connections {
		err := conn.WriteJSON(notification)
		if err != nil {
			log.Printf("Error sending notification to a connection for user %s: %v", username, err)
		}
	}

	return nil
}

func AddClient(conn *websocket.Conn, userID int, username string) {
	models.Mu.Lock()
	defer models.Mu.Unlock()

	if username != "" {
		if existingClient, found := models.Clients[username]; found {
			existingClient.Connections = append(existingClient.Connections, conn)
		} else {
			models.Clients[username] = &models.Client{
				Connections: []*websocket.Conn{conn},
				Userid:      userID,
				Username:    username,
			}
		}
	}

	BroadcastOnlineUsers()
}

func RemoveClient(conn *websocket.Conn) {
	models.Mu.Lock()
	defer models.Mu.Unlock()

	// Find the user with this connection
	for username, client := range models.Clients {
		for _, clientConn := range client.Connections {
			if clientConn == conn {
				delete(models.Clients, username)
				break
			}
		}
	}

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
		for _, conn := range client.Connections {
			err := conn.WriteJSON(data)
			if err != nil {
				conn.Close()
				delete(models.Clients, client.Username)
			}
		}

	}
}

func OnlineStatus(msg models.Message, client *models.Client, conn *websocket.Conn) error {
	onlineUsers := []string{}
	for username := range models.Clients {
		if username != client.Username {
			onlineUsers = append(onlineUsers, username)
		}
	}
	err := conn.WriteJSON(map[string]interface{}{
		"type":        "onlineStatus",
		"onlineUsers": onlineUsers,
	})
	if err != nil {
		return err
	}
	return nil
}
