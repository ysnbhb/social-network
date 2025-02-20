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
	codeStatus, err := services.CreateGroup(groupInfo)
	if err != nil {
		utils.JsonResponse(w, err.Error(), codeStatus)
		return
	}
	utils.JsonResponse(w, "group created", http.StatusOK)
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
	userId := r.Context().Value("userId").(int)
	users, err, code := services.MemberGroup(group, userId)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
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
	code, err := services.JoinToGroup(group, userId)
	utils.JsonResponse(w, err.Error(), code)
}

func SendInvi(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	gp_invi := models.Group_Invi{}
	err := json.NewDecoder(r.Body).Decode(&gp_invi)
	if err != nil {
		utils.JsonResponse(w, "uncorrected info", http.StatusBadRequest)
		return
	}
	userId := r.Context().Value("userId").(int)
	code, err := services.SendInvi(gp_invi, userId)
	utils.JsonResponse(w, err.Error(), code)
}

func GetGroupPost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.FormValue("groupId")
	if groupId == "" {
		utils.JsonResponse(w, "group id is required", http.StatusMethodNotAllowed)
		return
	}
	offste, _ := strconv.Atoi(r.FormValue("offste"))
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	posts, err := services.GetGroupPost(group, offste)
	if err != nil {
		utils.JsonResponse(w, "fieled to get group post", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, posts, http.StatusOK)
}

func ListGroups(w http.ResponseWriter, r *http.Request) {
	offste, _ := strconv.Atoi(r.FormValue("offste"))
	userId := r.Context().Value("userId").(int)
	groups, err := services.ListGroups(userId, offste)
	if err != nil {
		utils.JsonResponse(w, "fieled to get groups", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, groups, http.StatusOK)
}

func ListGroupsJoined(w http.ResponseWriter, r *http.Request) {
	offste, _ := strconv.Atoi(r.FormValue("offste"))
	userId := r.Context().Value("userId").(int)
	groups, err := services.ListGroups(userId, offste)
	if err != nil {
		utils.JsonResponse(w, "fieled to get groups", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, groups, http.StatusOK)
}
