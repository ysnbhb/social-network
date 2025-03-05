package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"social-network/app/services"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/utils"
)

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	offset, _ := strconv.Atoi(r.FormValue("offset"))
	var profileUserId int

	userId := r.Context().Value("userId").(int)
	other_user := r.URL.Query().Get("id")
	if other_user != "" {
		userId_other, err := strconv.Atoi(other_user)
		if err != nil {
			utils.JsonResponse(w, "This Id Is Incorrect", http.StatusBadRequest)
			log.Println("This Id Is Incorrect")
			return
		}
		profileUserId = userId_other
	} else {
		profileUserId = userId
	}
	log.Println(profileUserId, other_user, "hello")

	postsResponse := services.GetPostsUserProfile(profileUserId, offset)
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
	var profileUserId int

	userId := r.Context().Value("userId").(int)

	other_user := r.URL.Query().Get("id")
	if other_user != "" {
		userId_other, err := strconv.Atoi(other_user)
		if err != nil {
			utils.JsonResponse(w, "This Id Is Incorrect", http.StatusBadRequest)
			log.Println("This Id Is Incorrect")
			return
		}
		profileUserId = userId_other
	} else {
		profileUserId = userId
	}
	postsResponse, err := services.UserProfile(profileUserId)
	if err != nil {
		utils.JsonResponse(w, "This Id user Is not found", http.StatusNotFound)
		log.Println("This Id user Is not found:", err)
		return
	}
	err = json.NewEncoder(w).Encode(postsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}

func GetuserinfoByname(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	myuserid := r.Context().Value("userId").(int)
	username := r.URL.Query().Get("username")
	err := repo.CheckCanUSendMessage(username, myuserid)
	if err != nil {
		log.Println("error checking if user can send message:", err)
		utils.JsonResponse(w, err.Error()+"\nyou are not allowed to send message to "+username, 404)
		return
	}
	var userInfo map[string]string
	userInfo = map[string]string{
		"nickname": username,
	}
	err = json.NewEncoder(w).Encode(userInfo)
	if err != nil {
		log.Println("error encoding json userInfo:", err)
		utils.JsonResponse(w, "error encoding json userInfo", http.StatusInternalServerError)
		return
	}
}
