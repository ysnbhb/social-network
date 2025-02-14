package controllers

import (
	"log"
	"net/http"
	"social-network/pkg/utils"
)

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsoneResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}

}
