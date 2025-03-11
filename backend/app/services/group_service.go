package services

import (
	"database/sql"
	"errors"
	"log"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateGroup(gp *models.Groups) (statusCode int, err error) {
	err = utils.ValidateGroup(*gp)
	if err != nil {
		// utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		statusCode = http.StatusBadRequest
		return
	}
	err = repo.CreateGroup(gp)
	if err != nil {
		err = errors.New("field to create groupe")
		statusCode = http.StatusInternalServerError
		return
	}
	err = nil
	return
}

func GroupInfo(groupId int, userId int) (models.Groups, int, error) {
	exist := repo.CheckUserInGroup(groupId, userId)
	if !exist {
		return models.Groups{}, http.StatusForbidden, errors.New("you are not member in this group")
	}
	count, err := repo.GroupInfo(groupId)
	if err != nil {
		return models.Groups{}, http.StatusInternalServerError, errors.New("field to get group info")
	}
	return count, http.StatusOK, nil
}

func MemberGroup(groupId int, userId int) ([]models.GroupMember, error, int) {
	exist := repo.CheckGroup(groupId)
	if !exist {
		return nil, errors.New("group not found"), http.StatusNotFound
	}
	exist = repo.CheckUserInGroup(groupId, userId)
	if !exist {
		return nil, errors.New("you are not member in this group"), http.StatusUnauthorized
	}
	users, err := repo.MemberGroup(groupId, userId)
	if err != nil {
		return nil, errors.New("filed to get membre of groups"), http.StatusUnauthorized
	}
	return users, err, http.StatusOK
}

func JoinToGroup(groupId models.Group_Jion, userId int) (statusCode int, err error) {
	exist := repo.CheckGroup(groupId.GroupId)
	if !exist {
		err = errors.New("group you want join into dons't exist")
		statusCode = http.StatusNotFound
		return
	}
	hasInvi, err := repo.HasInvi(groupId.GroupId, userId)
	if err != sql.ErrNoRows && err != nil {
		err = errors.New("field to join to group")
		statusCode = http.StatusInternalServerError
		return
	}
	if hasInvi == "invitation" {
		exist = repo.CheckUserInGroup(groupId.GroupId, userId)
		if exist {
			err = errors.New("you are really in group")
			statusCode = http.StatusBadRequest
			return
		}
		if groupId.AcceptJoin == 1 {
			err = repo.JoinToGroup(groupId.GroupId, userId)
			if err != nil {
				err = errors.New("field to join to group")
				statusCode = http.StatusInternalServerError
			}
		} else if groupId.AcceptJoin != -1 {
			err = errors.New("unkown accept")
			statusCode = http.StatusBadRequest
			return
		}
		repo.Delete_group_Invi(groupId.GroupId, userId)
		// err = errors.New("you joined to group")
		statusCode = http.StatusOK
	} else {
		if err == sql.ErrNoRows {
			err = repo.InsertIntoGroup_Invi(groupId.GroupId, userId, "pending")
			if err != nil {
				err = errors.New("field to join to group")
				statusCode = http.StatusInternalServerError
			}
			// err = repo.AddNotification()
			// err = errors.New("you joined to group")
			statusCode = http.StatusCreated
		} else if err != nil {
			err = errors.New("field to join to group")
			statusCode = http.StatusInternalServerError
		} else if hasInvi == "pending" {
			repo.Delete_group_Invi(groupId.GroupId, userId)
		}
	}
	return
}

func SendInvi(gpInvi models.Group_Invi, userId int) (code int, err error) {
	if !(repo.IsFollowing(userId, gpInvi.UserId)) {
		err = errors.New("you can't send invitation to this user")
		code = http.StatusBadGateway
		return
	}
	exist := repo.CheckGroup(gpInvi.GroupId)
	if !exist {
		err = errors.New("group you want join into dons't exist")
		code = http.StatusNotFound
		return
	}
	exist = repo.CheckUserExist(gpInvi.UserId)
	if !exist {
		err = errors.New("user you want join into dons't exist")
		code = http.StatusNotFound
		return
	}
	exist = repo.CheckUserInGroup(gpInvi.GroupId, userId)
	if !exist {
		err = errors.New("you don't have right to send invitation")
		code = http.StatusUnauthorized
		return
	}
	exist = repo.CheckUserInGroup(gpInvi.GroupId, gpInvi.UserId)
	if exist {
		err = errors.New("user just to invitation ready in group")
		code = http.StatusBadRequest
		return
	}
	err = repo.InsertIntoGroup_Invi(gpInvi.GroupId, gpInvi.UserId, "invitation")
	if err != nil {
		err = errors.New("field to join to group")
		code = http.StatusInternalServerError
	}
	err = errors.New("invitation sended  to user")
	code = http.StatusCreated
	return
}

func GetGroupPost(groupId, userid, offste int) ([]models.PostsResponse, error, int) {
	if !repo.CheckUserInGroup(groupId, userid) {
		return nil, errors.New("you have to jion to this group fisrt"), http.StatusUnauthorized
	}
	posts, err := repo.GetGroupPost(groupId, offste, userid)
	if err != nil {
		return nil, err, http.StatusInternalServerError
	}
	return posts, nil, http.StatusOK
}

func ListJionGroups(userId int) ([]models.Groups, error) {
	return repo.ListJionGroups(userId)
}

func ListUnJoinGroups(userId int) ([]models.Groups, error) {
	return repo.ListUnJoinGroups(userId)
}

func ListInviGroups(userId int) ([]models.Groups, error) {
	return repo.ListInviGroups(userId)
}

func AcceptJoin(groupId models.Group_Invi, userid int) (error, int) {
	if repo.GeTIdofAdminOfGroup(groupId.GroupId) != userid {
		return errors.New("you have no right to this "), http.StatusUnauthorized
	}
	groupId.UserId = repo.GetUserIdByNickName(groupId.Sender)
	exist := repo.CheckUserInGroup(groupId.GroupId, groupId.UserId)
	if exist {
		return errors.New("user just to invitation ready in group"), http.StatusBadRequest
	}
	have, _ := repo.HasInvi(groupId.GroupId, groupId.UserId)
	if have == "invitation" {
		return errors.New("user just to invitation ready in group"), http.StatusBadRequest
	}
	if have == "" {
		return errors.New("user just to invitation ready in group"), http.StatusBadRequest
	}
	if groupId.Status == "accept" {
		err := repo.JoinToGroup(groupId.GroupId, groupId.UserId)
		if err != nil {
			return errors.New("field to join to group"), http.StatusInternalServerError
		}
	}
	repo.Delete_group_Invi(groupId.GroupId, groupId.UserId)
	return nil, http.StatusOK
}

func GetGroup(groupId int, userId int) (models.Groups, error) {
	return repo.GetGroupInfo(groupId, userId)
}

func CreateEvent(gp_env *models.Event) (error, int) {
	if !repo.CheckUserInGroup(gp_env.GroupId, gp_env.CreatorId) {
		return errors.New("you have no right to this "), http.StatusUnauthorized
	}
	log.Println(gp_env.StartDate)
	if !utils.IsValidTime((gp_env.StartDate)) {
		return errors.New("start time must be after now"), http.StatusBadRequest
	}
	err := utils.ValidEvant(gp_env)
	if err != nil {
		return err, http.StatusBadRequest
	}
	err = repo.CreateEvent(gp_env)
	if err != nil {
		log.Println(err)
		return errors.New("field to create event"), http.StatusInternalServerError
	}
	err = repo.AddNotificationGroupEvent(gp_env.CreatorId, gp_env.GroupId)
	gp_env.Creator_User = repo.GetNickName(gp_env.CreatorId)
	return nil, http.StatusOK
}

func GetEvent(groupId, userId int) ([]models.Event, error, int) {
	if !repo.CheckUserInGroup(groupId, userId) {
		return nil, errors.New("you have no right to this "), http.StatusUnauthorized
	}
	events, err := repo.GetEvents(userId, groupId)
	if err != nil {
		return nil, errors.New("field to get events"), http.StatusInternalServerError
	}
	return events, nil, http.StatusOK
}

func RespoEvent(eventId int, userId int, status string) (error, int) {
	if !repo.CheckUserInGroup(repo.GetGroupIdByEventId(eventId), userId) {
		return errors.New("you have no right to this "), http.StatusUnauthorized
	}
	if status != "Going" && status != "Not Going" {
		return errors.New("status must be going or not going"), http.StatusBadRequest
	}
	if repo.CheckUserInEvent(eventId, userId) {
		return errors.New("you already respo to this event"), http.StatusBadRequest
	}
	err := repo.RespoEvent(eventId, userId, status)
	if err != nil {
		return errors.New("field to get events"), http.StatusInternalServerError
	}
	return nil, http.StatusOK
}

func GetGroup_Resuest(groupId int, userId int) ([]models.User, error, int) {
	if repo.GeTIdofAdminOfGroup(groupId) != userId {
		return nil, nil, http.StatusOK
	}
	invites, err := repo.GetGroup_Resuest(groupId)
	if err != nil {
		return nil, errors.New("field to get user"), http.StatusInternalServerError
	}
	return invites, nil, http.StatusOK
}
