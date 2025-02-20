package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func GetHomePosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	userId := r.Context().Value("userId").(int)
	var postsResponse []models.PostsResponse
	err := services.GetHomePosts(&postsResponse, userId)
	if err != nil {
		utils.JsonResponse(w, "Error getting posts", http.StatusInternalServerError)
		log.Println(err)
	}

	err = json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}
