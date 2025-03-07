package controllers

import (
	"encoding/json"
	"fmt"
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
	codeStatus, err := services.CreateGroup(&groupInfo)
	if err != nil {
		utils.JsonResponse(w, err.Error(), codeStatus)
		return
	}
	groupInfo.TotalMembers = 1
	utils.JsonResponse(w, groupInfo, http.StatusOK)
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

	gpJion := models.Group_Jion{}
	err := json.NewDecoder(r.Body).Decode(&gpJion)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		return
	}
	userId := r.Context().Value("userId").(int)
	code, err := services.JoinToGroup(gpJion, userId)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	groupInfo, err := services.GetGroup(gpJion.GroupId, userId)
	if err != nil {
		utils.JsonResponse(w, "fieled to get group info", http.StatusInternalServerError)
		return
	}

	utils.JsonResponse(w, groupInfo, http.StatusOK)
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
	userId := r.Context().Value("userId").(int)
	posts, err, code := services.GetGroupPost(group, userId, offste)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, posts, http.StatusOK)
}

func ListGroups(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(int)
	groups, err := services.ListJionGroups(userId)
	if err != nil {
		utils.JsonResponse(w, "fieled to get groups", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, groups, http.StatusOK)
}

func ListUnJoinGroups(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(int)
	groups, err := services.ListUnJoinGroups(userId)
	if err != nil {
		utils.JsonResponse(w, "fieled to get groups", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, groups, http.StatusOK)
}

func ListInviGroups(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId").(int)
	groups, err := services.ListInviGroups(userId)
	if err != nil {
		utils.JsonResponse(w, "fieled to get groups", http.StatusInternalServerError)
		return
	}
	utils.JsonResponse(w, groups, http.StatusOK)
}

func AcceptJoin(w http.ResponseWriter, r *http.Request) {
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
	err, code := services.AcceptJoin(gp_invi, userId)
	if err != nil {
		utils.JsonResponse(w, err, code)
		return
	}
	utils.JsonResponse(w, "you accepted user to group", code)
}

func GroupInfo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.FormValue("groupId")
	if groupId == "" {
		utils.JsonResponse(w, "group id is required", http.StatusMethodNotAllowed)
		return
	}
	userId := r.Context().Value("userId").(int)
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	groupinfo, code, err := services.GroupInfo(group, userId)
	if err != nil {
		fmt.Println(err)
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, groupinfo, http.StatusOK)
}

func CreateEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	gp_env := models.Event{}
	err := json.NewDecoder(r.Body).Decode(&gp_env)
	if err != nil {
		// log.Println(err)
		utils.JsonResponse(w, "uncorrected info", http.StatusBadRequest)
		return
	}
	userId := r.Context().Value("userId").(int)
	gp_env.CreatorId = userId
	err, code := services.CreateEvent(&gp_env)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, gp_env, code)
}

func GetEvents(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.FormValue("groupId")
	if groupId == "" {
		utils.JsonResponse(w, "group id is required", http.StatusMethodNotAllowed)
		return
	}
	userId := r.Context().Value("userId").(int)
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	events, err, code := services.GetEvent(group, userId)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, events, http.StatusOK)
}

func RespoEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	gp_env := models.RespoEvent{}
	err := json.NewDecoder(r.Body).Decode(&gp_env)
	if err != nil {
		// log.Println(err)
		utils.JsonResponse(w, "uncorrected info", http.StatusBadRequest)
		return
	}
	userId := r.Context().Value("userId").(int)
	err, code := services.RespoEvent(gp_env.Id, userId, gp_env.Status)
	if err != nil {
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, gp_env, code)
}

func GroupChat(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	// groupid := r.URL.Query().Get("groupid")
	// Chat
	// userId := r.Context().Value("userId").(int)
	// gp_env.SenderId = userId
	// err, code := services.GroupChat(gp_env)
	// if err != nil {
	// 	utils.JsonResponse(w, err.Error(), code)
	// 	return
	// }
	// utils.JsonResponse(w, gp_env, code)

}

func Groupmembers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	groupId := r.URL.Query().Get("groupid")
	userId := r.Context().Value("userId").(int)
	group, err := strconv.Atoi(groupId)
	if err != nil {
		utils.JsonResponse(w, "group id must be int", http.StatusMethodNotAllowed)
		return
	}
	users, err, code := services.MemberGroup(group, userId)
	if err != nil {
		fmt.Println("err", err)
		utils.JsonResponse(w, err.Error(), code)
		return
	}
	utils.JsonResponse(w, users, code)
}
