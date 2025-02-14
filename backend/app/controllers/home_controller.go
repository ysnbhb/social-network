package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func GetHomePosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsoneResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}

	var postsResponse []models.PostsResponse
	err := repo.GetHomePosts(&postsResponse)
	if err != nil {
		utils.JsoneResponse(w, "Error getting posts", http.StatusInternalServerError)
		log.Println(err)
	}

	err = json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}

}
