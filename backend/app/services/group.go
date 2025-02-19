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
		utils.JsonResponse(w, "field to create groupe", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, "group created", http.StatusCreated)
}

func MemberGroup(groupId int) ([]models.User, error) {
	exist := repo.CheckGroup(groupId)
	if !exist {
		return nil, nil
	}
	users, err := repo.MemberGroup(groupId)
	return users, err
}

func JoinToGroup(w http.ResponseWriter, groupId, userId int) {
	exist := repo.CheckGroup(groupId)
	if !exist {
		utils.JsonResponse(w, "group you want join into dons't exist", http.StatusNotFound)
		return
	}
	exist = repo.CheckUserInGroup(groupId, userId)
	if exist {
		utils.JsonResponse(w, "you are really in group", http.StatusBadRequest)
		return
	}
	err := repo.JoinToGroup(groupId, userId)
	if err != nil {
		utils.JsonResponse(w, "field to join to group", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, "joined to group", http.StatusCreated)
}
