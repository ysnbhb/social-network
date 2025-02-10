package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func AddReaction(w http.ResponseWriter, r *http.Request) {
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

	var reactionResponse models.ReactionResponse
	// response.LikesCount, response.DislikesCount = like.GetReactionCounts(request.CardID)
	// response.UserReaction = like.GetUserReaction(request.UserId, request.CardID)

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
