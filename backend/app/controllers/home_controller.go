package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

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
	offset, _ := strconv.Atoi(r.FormValue("offset"))
	userId := r.Context().Value("userId").(int)
	var postsResponse []models.PostsResponse
	err := services.GetHomePosts(&postsResponse, userId, offset)
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

func GetOneCard(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	postId, _ := strconv.Atoi(r.FormValue("cardId"))
	userId := r.Context().Value("userId").(int)
	postResponse, err := services.GetOneCard(postId, userId)
	if err != nil {
		utils.JsonResponse(w, "No comments available.", http.StatusInternalServerError)
		log.Println(err)
		return
	}
	utils.JsonResponse(w, postResponse, http.StatusOK)
}
