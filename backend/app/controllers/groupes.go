package controllers

import (
	"encoding/json"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateGroup(w http.ResponseWriter, r *http.Request) {
	groupInfo := models.Groups{}
	err := json.NewDecoder(r.Body).Decode(&groupInfo)
	if err != nil {
		utils.JsonResponse(w, "uncorrected info", http.StatusBadRequest)
		return
	}
	groupInfo.Owner = r.Context().Value("user_id").(int)
	services.CreateGroup(w, groupInfo)
}
