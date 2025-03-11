package controllers

import (
	"encoding/json"
	"errors"
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

	err := r.ParseMultipartForm(10 << 20)
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
	file, headerFiel, _ := r.FormFile("image")
	if file != nil {
		commentRequest.ImgContant, err = utils.LimitRead(file, 3*1024*1024)
		if err != nil {
			utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = utils.ValidImg(headerFiel.Header.Get("Content-Type"), headerFiel.Size)
		if err != nil {
			utils.JsonResponse(w, errors.New("validating image: "+err.Error()), http.StatusBadRequest)
			return
		}
		if utils.IsSVG(commentRequest.ImgContant) {
			utils.JsonResponse(w, "img is svg", http.StatusBadRequest)
			return
		}
	}
	commentRequest.Content = content
	commentRequest.GroupId = groupId
	commentRequest.TargetId, err = strconv.Atoi(target)

	user := r.Context().Value("userId").(int)
	commentRequest.UserId = user

	// Add the comment
	card, err := services.AddComments(&commentRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	utils.JsonResponse(w, card, http.StatusOK)
}

func GetComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	cardId, err := strconv.Atoi(r.FormValue("target_id"))
	if err != nil {
		utils.JsonResponse(w, "Status Bad Request", http.StatusBadRequest)
		return
	}
	userId := r.Context().Value("userId").(int)
	var commentsResponse []models.CommentResponse
	err = services.GetComments(&commentsResponse, userId, cardId)
	if err != nil {
		utils.JsonResponse(w, "Error getting comments", http.StatusInternalServerError)
		log.Println(err)
	}
	err = json.NewEncoder(w).Encode(commentsResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}
