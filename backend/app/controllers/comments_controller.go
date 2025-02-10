package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateComments(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed")
		return
	}

	var commentRequest models.CommentRequest
	err := json.NewDecoder(r.Body).Decode(&commentRequest)
	if err != nil {
		fmt.Println("error decoding json commentRequest", err.Error())
		return
	}

	err = utils.ValidateComment(&commentRequest)
	if err != nil {
		fmt.Println(err)
		return
	}

}
