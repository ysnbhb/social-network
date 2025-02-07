package main

import (
	"fmt"
	"log"

	database "social-network/pkg/db/sqlite"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	Err := database.InitDB()
	if Err != nil {
		log.Fatal(fmt.Errorf("failed to initialize database: %w", Err))
	}
}
