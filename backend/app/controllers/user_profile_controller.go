package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"social-network/app/services"
	"social-network/pkg/utils"
)

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	offset, _ := strconv.Atoi(r.FormValue("offset"))
	fmt.Println(offset)
	userId := r.Context().Value("userId").(int)
	postsResponse := services.GetPostsUserProfile(userId, offset) // just test with user id 1
	err := json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}

func GetInfoUserProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	userId := r.Context().Value("userId").(int)
	postsResponse := services.UserProfile(userId) // just test with user id 1
	err := json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}
