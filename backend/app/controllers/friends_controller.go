package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	service "social-network/app/services"
	"social-network/pkg/utils"
)

func Friends(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	userId := r.Context().Value("userId").(int)
	friends := service.GetFriendsService(userId)
	err := json.NewEncoder(w).Encode(friends)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error Get Friends:", err)
		return
	}
}
