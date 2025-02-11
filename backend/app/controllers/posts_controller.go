package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "Method not allowed", http.StatusBadRequest)
		log.Println("method not allowed")
		return
	}

	var postRequest models.PostRequest
	err := json.NewDecoder(r.Body).Decode(&postRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json postRequest:", err)
		return
	}

	err = utils.ValidatePost(&postRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("validating post:", err)
		return
	}

	// postRequest.UserId = r.Context().Value("userId").(int)
	err = repo.CreatPost(&postRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("creating post in db:", err)
		return
	}

	// Add success response
	utils.JsoneResponse(w, "Post created successfully", http.StatusCreated)
}
