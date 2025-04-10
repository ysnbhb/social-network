package controllers

import (
	"log"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/utils"
)

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	searchContent := r.FormValue("searchContent")
	userId := r.Context().Value("userId").(int)
	users, err := services.SearchUsersByContent(searchContent, userId)
	if err != nil {
		utils.JsonResponse(w, "Failed to search users", http.StatusInternalServerError)
		log.Println("Error searching users:", err)
		return
	}
	utils.JsonResponse(w, users, http.StatusOK)
}
