package main

import (
	"fmt"
	"log"

	db "social-network/pkg/db/sqlite"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	if err := db.InitDB(); err != nil {
		log.Fatal(fmt.Errorf("failed to initialize database: %w", err))
	}
	defer db.CloseDB() // Ensure the database connection is closed when the server shuts down

	// Start the server (add your server initialization logic here)
	log.Println("Server started successfully")
}
