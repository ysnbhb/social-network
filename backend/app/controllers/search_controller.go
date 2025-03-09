package controllers

import (
	"fmt"
	"log"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/utils"
)

func SearchUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Println("///////////////////////////////")
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	searchContent := r.FormValue("searchContent")
	fmt.Println("search", searchContent)
	users, err := services.SearchUsersByContent(searchContent)
	if err != nil {
		utils.JsonResponse(w, "Failed to search users", http.StatusInternalServerError)
		log.Println("Error searching users:", err)
		return
	}
	fmt.Println(users)
	utils.JsonResponse(w, users, http.StatusOK)
}
