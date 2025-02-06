package main

import (
	"fmt"
	"log"

	database "social-network/pkg/db/sqlite"

	"github.com/gofrs/uuid"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	Err := database.InitDB()
	if Err != nil {
		log.Fatal(fmt.Errorf("failed to initialize database: %w", Err))
	}

	u4, err := uuid.NewV4()
	if err != nil {
		log.Fatalf("failed to generate UUID: %v", err)
	}
	log.Printf("generated Version 4 UUID %v", u4)

	// mux := http.NewServeMux()

	// route.SetupAPIRoutes(mux)
	// route.SetupPageRoutes(mux)

	// serverAddr := ":3333"
	// log.Printf("Server running at http://localhost%s/space\n", serverAddr)
	// err := http.ListenAndServe(serverAddr, mux)
	// if err != nil {
	// 	log.Fatal("ListenAndServe Error: ", err)
	// }
}
