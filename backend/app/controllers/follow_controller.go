package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func HandleFollow(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}

	var followRequest models.FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json postRequest:", err)
		return
	}

	err = repo.SendFollow(&followRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("Follow User in db:", err)
		return
	}

}
