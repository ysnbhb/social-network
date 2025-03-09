package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"social-network/app/services"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func HandleFollow(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	var followRequest models.FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json postRequest:", err)
		return
	}
	user := r.Context().Value("userId").(int)
	followRequest.FollowerId = user
	exists, err := services.AddFollow(&followRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("Follow User in db:", err)
		return
	}
	err = repo.AddNotificationFollow(exists, user, followRequest.FollowingId)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("Add Notification in db:", err)
		return
	}
	utils.JsonResponse(w, followRequest, http.StatusOK)
}

func ShowUnfollowUser(w http.ResponseWriter, r *http.Request) {
	user, err := services.GetFollowers(r.Context().Value("userId").(int))
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		return
	}
	utils.JsonResponse(w, user, http.StatusOK)
}

