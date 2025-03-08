package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"social-network/app/services"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func GetCreatedPosts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	offset, _ := strconv.Atoi(r.FormValue("offset"))
	other_user := r.URL.Query().Get("username")
	postsResponse := services.GetPostsUserProfile(other_user, offset)
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
	var nickName string
	other_user := r.URL.Query().Get("username")
	username := r.Context().Value("username").(string)
	if other_user != "" {
		nickName = other_user
	} else {
		nickName = username
	}

	postsResponse, err := services.UserProfile(nickName)
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
	// select the user info from  the database
	userInfo, err := repo.GetUserInfoByUsername(username)
	if err != nil {
		log.Println("error getting user info:", err)
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = json.NewEncoder(w).Encode(userInfo)
	if err != nil {
		log.Println("error encoding json userInfo:", err)
		utils.JsonResponse(w, "error encoding json userInfo", http.StatusInternalServerError)
		return
	}
}

func Userfollowing(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	following := models.UserRelation{}
	var err error

	user := r.Context().Value("userId").(int)
	following.Following, err = services.GetUserFollowing(user)
	if err != nil {
		utils.JsonResponse(w, "Error To Get following", http.StatusMethodNotAllowed)
		log.Println(err.Error())
		return
	}
	following.Follower, err = services.GetUserFollower(user)
	if err != nil {
		utils.JsonResponse(w, "Error To Get Follower", http.StatusMethodNotAllowed)
		log.Println(err.Error())
		return
	}
	err = json.NewEncoder(w).Encode(following)
	if err != nil {
		log.Println("error encoding json userInfo:", err)
		utils.JsonResponse(w, "error encoding json userInfo", http.StatusInternalServerError)
		return
	}
}
