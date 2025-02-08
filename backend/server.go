package main

import (
	"fmt"
	"log"
	"net/http"

	"social-network/app"
	db "social-network/pkg/db/sqlite"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	if err := db.InitDB(); err != nil {
		log.Fatal(fmt.Errorf("failed to initialize database: %w", err))
	}
	defer db.CloseDB()

	router := app.SetupRoutes()

	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
