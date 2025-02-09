package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"social-network/pkg/models"
)

func HandlePostReaction(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed in signup")
		return
	}

	var reactionRequest models.ReactionRequest
	err := json.NewDecoder(r.Body).Decode(&reactionRequest)
	if err != nil {
		fmt.Println("error decoding json reactionRequest", err.Error())
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

	fmt.Println("Handling POST reaction")

}

func HandleGetReaction(w http.ResponseWriter, r *http.Request) {
	// Logic for handling GET requests (e.g., fetching reactions)
	fmt.Println("Handling GET reaction")
}
