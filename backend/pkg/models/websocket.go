package models

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Message struct {
	Type     string `json:"type"`
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Content  string `json:"content"`
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
