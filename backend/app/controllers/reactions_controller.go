package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func HandleReaction(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "Method not allowed", http.StatusBadRequest)
		log.Println("method not allowed")
		return
	}

	var reactionRequest models.ReactionRequest
	err := json.NewDecoder(r.Body).Decode(&reactionRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json reactionRequest:", err)
		return
	}

	err = utils.ValidateReaction(&reactionRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("validating reaction:", err)
		return
	}

	// reactionRequest.UserId = r.Context().Value("userId").(int)
	err = repo.AddReaction(&reactionRequest)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding reaction to db:", err)
		return
	}

	var reactionResponse models.ReactionResponse
	reactionResponse.LikesCount, reactionResponse.DislikesCount = repo.GetReactionCounts(reactionRequest.CardId)
	reactionResponse.UserReaction = reactionRequest.ReactionType

	err = json.NewEncoder(w).Encode(reactionResponse)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}

func GetReaction(w http.ResponseWriter, r *http.Request) {
	// Logic for handling GET requests (e.g., fetching reactions)
	fmt.Println("Handling GET reaction")
}
