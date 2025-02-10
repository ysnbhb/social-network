package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed")
		return
	}

	var postRequest models.PostRequest
	err := json.NewDecoder(r.Body).Decode(&postRequest)
	if err != nil {
		fmt.Println("error decoding json reactionRequest", err.Error())
		return
	}

	err = utils.ValidatePost(&postRequest)
	if err != nil {
		fmt.Println(err)
		return
	}

	// postRequest.UserId = r.Context().Value("userId").(int)
	err = repo.CreatPost(&postRequest)
	if err != nil {
		fmt.Println(err)
	}
	
}
