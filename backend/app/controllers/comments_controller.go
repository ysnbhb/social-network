package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "Method not allowed", http.StatusBadRequest)
		log.Println("method not allowed")
		return
	}

	var commentRequest models.CommentRequest
	err := json.NewDecoder(r.Body).Decode(&commentRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json commentRequest:", err)
		return
	}

	err = utils.ValidateComment(&commentRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("validating comment:", err)
		return
	}

	err = repo.AddComment(&commentRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding comment to db:", err)
		return
	}

	// You might want to add a success response here
	utils.JsoneResponse(w, "Comment created successfully", http.StatusCreated)
}
