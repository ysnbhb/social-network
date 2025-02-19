package services

import (
	"database/sql"
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
	hasInvi, err := repo.HasInvi(groupId, userId)
	if err != sql.ErrNoRows {
		utils.JsonResponse(w, "field to join to group", http.StatusInternalServerError)
		return
	}
	if hasInvi == "invitation" {
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
		repo.Delete_group_Invi(groupId, userId)
		utils.JsonResponse(w, "joined to group", http.StatusCreated)
	} else {
		if err == sql.ErrNoRows {
			err = repo.InsertIntoGroup_Invi(groupId, userId, "pending")
			if err != nil {
				utils.JsonResponse(w, "field to join to group", http.StatusInternalServerError)
			}
			utils.JsonResponse(w, "invitation sended  to group", http.StatusCreated)

		} else {
			utils.JsonResponse(w, "you have sended invition to this group", http.StatusBadRequest)
		}
	}
}

func SendInvi(w http.ResponseWriter, gpInvi models.Group_Invi, userId int) {
	exist := repo.CheckGroup(gpInvi.GroupId)
	if !exist {
		utils.JsonResponse(w, "group you want join into dons't exist", http.StatusNotFound)
		return
	}
	exist = repo.CheckUserInGroup(gpInvi.GroupId, userId)
	if !exist {
		utils.JsonResponse(w, "you don't have right to send invitation", http.StatusUnauthorized)
		return
	}
	exist = repo.CheckUserInGroup(gpInvi.GroupId, gpInvi.UserId)
	if exist {
		utils.JsonResponse(w, "user just to invitation ready in group", http.StatusBadRequest)
		return
	}
	err := repo.InsertIntoGroup_Invi(gpInvi.GroupId, gpInvi.UserId, "invitation")
	if err != nil {
		utils.JsonResponse(w, "field to join to group", http.StatusInternalServerError)
	}
	utils.JsonResponse(w, "invitation sended  to user", http.StatusCreated)
}
