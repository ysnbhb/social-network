package controllers

import (
	"encoding/json"
	"log"
	"net/http"

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

	var commentRequest models.CommentRequest
	err := json.NewDecoder(r.Body).Decode(&commentRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json commentRequest:", err)
		return
	}
	user := r.Context().Value("userId").(int)
	commentRequest.UserId = user
	err = services.AddComments(&commentRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	// You might want to add a success response here
	utils.JsonResponse(w, "Comment created successfully", http.StatusCreated)
}
