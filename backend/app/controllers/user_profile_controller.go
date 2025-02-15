package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsoneResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	var postsResponse []models.PostsResponse
	// userId := r.Context().Value("userId").(string)
	// _ = userId
	err := repo.GetCreatedUserPosts(&postsResponse, "1") // just test with user id 1
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("Get Created Posts:", err)
		return
	}

	err = json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}
