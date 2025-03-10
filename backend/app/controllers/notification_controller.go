package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/utils"
)

func GetNotification(w http.ResponseWriter, r *http.Request) {
	UserID := r.Context().Value("userId").(int)
	dataNotification, err := repo.GetNotification(UserID)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error Get Notification:", err)
		return
	}
	fmt.Println("user", UserID)

	err = json.NewEncoder(w).Encode(dataNotification)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error Get Notification:", err)
		return
	}
}
