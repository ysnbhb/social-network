package services

import (
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateGroup(w http.ResponseWriter, gp models.Groups) {
	err := utils.ValidateGroup(gp)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = repo.CreateGroup(gp)
	if err != nil {
		utils.JsonResponse(w, "fiel to create groupe", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, "group created", http.StatusCreated)
}
