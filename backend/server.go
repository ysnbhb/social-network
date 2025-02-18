package main

import (
	"fmt"
	"log"
	"net/http"

	"social-network/app"
	"social-network/middleware"
	db "social-network/pkg/db/sqlite"
	logexplore "social-network/pkg/log"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	if err := db.InitDB(); err != nil {
		log.Fatal(fmt.Errorf("failed to initialize database: %w", err))
	}
	defer db.CloseDB()
	logexplore.LogFile()
	router := app.SetupRoutes()
	server := &http.Server{
		Addr:    ":8080",
		Handler: middleware.WithCORS(router),
	}
	log.Println("Starting server on :8080")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server error: %v", err)
	}
}
