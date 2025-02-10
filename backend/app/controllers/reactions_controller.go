package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func HandleReaction(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed")
		return
	}

	var reactionRequest models.ReactionRequest
	err := json.NewDecoder(r.Body).Decode(&reactionRequest)
	if err != nil {
		fmt.Println("error decoding json reactionRequest", err.Error())
		return
	}

	err = utils.ValidateReaction(&reactionRequest)
	if err != nil {
		fmt.Println(err)
		return
	}

	// reactionRequest.UserId = r.Context().Value("userId").(int)
	err = repo.AddReaction(&reactionRequest)
	if err != nil {
		fmt.Println(err)
	}

	var reactionResponse models.ReactionResponse
	reactionResponse.LikesCount, reactionResponse.DislikesCount = repo.GetReactionCounts(reactionRequest.CardId)
	reactionResponse.UserReaction = reactionRequest.ReactionType
	err = json.NewEncoder(w).Encode(reactionResponse)
	if err != nil {
		fmt.Println("error decoding json reactionResponse", err.Error())
		return
	}
}

func GetReaction(w http.ResponseWriter, r *http.Request) {
	// Logic for handling GET requests (e.g., fetching reactions)
	fmt.Println("Handling GET reaction")
}
