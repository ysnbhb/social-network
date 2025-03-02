package controllers

import (
	"encoding/json"
	"fmt"
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
		utils.JsonResponse(w, "you are not allowed to send message to "+username, http.StatusInternalServerError)
		return
	}
	// if err != nil {
	// 	client.Conn.WriteJSON(map[string]interface{}{
	// 		"type":    "error",
	// 		"content": "you can't send message to this user: " + err.Error(),
	// 	})
	// 	return err
	// }
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
