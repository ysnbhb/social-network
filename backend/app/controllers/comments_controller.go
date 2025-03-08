package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}

	err := r.ParseMultipartForm(10 << 20) // 10 MB max memory
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error parsing multipart form:", err)
		return
	}

	var commentRequest models.CommentRequest
	
	content := r.FormValue("content")
	groupIdStr := r.FormValue("groupId")
	target := r.FormValue("targetId")
	groupId, err := strconv.Atoi(groupIdStr)
	if err != nil {
		utils.JsonResponse(w, "Invalid groupId format", http.StatusBadRequest)
		log.Println("error converting groupId to int:", err)
		return
	}
	commentRequest.Content = content
	commentRequest.GroupId = groupId
	commentRequest.TargetId, err = strconv.Atoi(target)

	user := r.Context().Value("userId").(int)
	commentRequest.UserId = user
	
	// Add the comment
	err = services.AddComments(&commentRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	// Success response
	utils.JsonResponse(w, "Comment created successfully", http.StatusCreated)
}

func GetComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	fmt.Println("method pass success <<<1>>>")
	cardId, err := strconv.Atoi(r.FormValue("target_id"))
	if err != nil {
		utils.JsonResponse(w, "Status Bad Request", http.StatusBadRequest)
		return
	}
	fmt.Println(cardId, " << cardId pass success <<<2>>>")

	userId := r.Context().Value("userId").(int)
	var commentsResponse []models.CommentResponse
	err = services.GetComments(&commentsResponse, userId, cardId)
	if err != nil {
		utils.JsonResponse(w, "Error getting comments", http.StatusInternalServerError)
		log.Println(err)
	}
	fmt.Println(commentsResponse, " << comment resp pass success <<<1>>>")

	err = json.NewEncoder(w).Encode(commentsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}