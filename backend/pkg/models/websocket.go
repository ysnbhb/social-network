package models

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Message struct {
	Type           string   `json:"type"`
	Sender         string   `json:"sender"`
	Receivers      []string `json:"receiver"`
	Content        string   `json:"content"`
	Groupid        int      `json:"groupid"`
	Notificationid int      `json:"notificationid"`
	Offset         int      `json:"offset"`
}
type Client struct {
	Conn     *websocket.Conn
	Userid   int
	Username string
}

var (
	Clients = make(map[string]*Client)
	Mu      sync.Mutex
)
