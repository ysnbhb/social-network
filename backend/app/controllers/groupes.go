package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateGroup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupInfo := models.Groups{}
	err := json.NewDecoder(r.Body).Decode(&groupInfo)
	if err != nil {
		utils.JsonResponse(w, "uncorrected info", http.StatusBadRequest)
		return
	}
	groupInfo.Owner = r.Context().Value("userId").(int)
	services.CreateGroup(w, groupInfo)
}

func ShowGroupMember(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.FormValue("groupId")
	if groupId == "" {
		utils.JsonResponse(w, "group id is required", http.StatusMethodNotAllowed)
		return
	}
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	users, err := services.MemberGroup(group)
	if err != nil {
		utils.JsonResponse(w, "field to fetch user", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, users, http.StatusOK)
}

func JoinToGroup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.FormValue("groupId")
	if groupId == "" {
		utils.JsonResponse(w, "group id is required", http.StatusMethodNotAllowed)
		return
	}
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	userId := r.Context().Value("userId").(int)
	services.JoinToGroup(w, group, userId)
}
