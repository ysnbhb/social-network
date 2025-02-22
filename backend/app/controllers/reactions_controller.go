package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func HandleReaction(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}

	var reactionRequest models.ReactionRequest
	err := json.NewDecoder(r.Body).Decode(&reactionRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error decoding json reactionRequest:", err)
		return
	}
	user := r.Context().Value("userId").(int)
	reactionRequest.UserId = user
	err = services.AddReaction(&reactionRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding reaction to db:", err)
		return
	}

	var reactionResponse models.ReactionResponse
	reactionResponse.LikesCount, reactionResponse.DislikesCount = services.GetReactionCounts(&reactionRequest)
	reactionResponse.UserReaction = reactionRequest.ReactionType

	err = json.NewEncoder(w).Encode(reactionResponse)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}
