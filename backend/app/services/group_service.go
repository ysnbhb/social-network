package services

import (
	"database/sql"
	"errors"
	"net/http"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreateGroup(gp models.Groups) (statusCode int, err error) {
	err = utils.ValidateGroup(gp)
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

func MemberGroup(groupId int, userId int) ([]models.User, error, int) {
	exist := repo.CheckGroup(groupId)
	if !exist {
		return nil, errors.New("group not found"), http.StatusNotFound
	}
	exist = repo.CheckUserInGroup(groupId, userId)
	if !exist {
		return nil, errors.New("you are not member in this group"), http.StatusUnauthorized
	}
	users, err := repo.MemberGroup(groupId)
	if err != nil {
		return nil, errors.New("filed to get membre of groups"), http.StatusUnauthorized
	}
	return users, err, http.StatusOK
}

func JoinToGroup(groupId, userId int) (statusCode int, err error) {
	exist := repo.CheckGroup(groupId)
	if !exist {
		err = errors.New("group you want join into dons't exist")
		statusCode = http.StatusNotFound
		return
	}
	hasInvi, err := repo.HasInvi(groupId, userId)
	if err != sql.ErrNoRows {
		err = errors.New("field to join to group")
		statusCode = http.StatusInternalServerError
		return
	}
	if hasInvi == "invitation" {
		exist = repo.CheckUserInGroup(groupId, userId)
		if exist {
			err = errors.New("you are really in group")
			statusCode = http.StatusBadRequest
			return
		}
		err = repo.JoinToGroup(groupId, userId)
		if err != nil {
			err = errors.New("field to join to group")
			statusCode = http.StatusInternalServerError
		}
		repo.Delete_group_Invi(groupId, userId)
		err = errors.New("you joined to group")
		statusCode = http.StatusOK
	} else {
		if err == sql.ErrNoRows {
			err = repo.InsertIntoGroup_Invi(groupId, userId, "pending")
			if err != nil {
				err = errors.New("field to join to group")
				statusCode = http.StatusInternalServerError
			}
			err = errors.New("you joined to group")
			statusCode = http.StatusCreated
		} else {
			err = errors.New("you have sended invition to this group")
			statusCode = http.StatusBadRequest
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

func ListGroups(userId, offset int) ([]models.Groups, error) {
	return repo.ListGroups(userId, offset)
}

func ListGroupsJoined(userId, offset int) ([]models.Groups, error) {
	return repo.ListGroupsJoined(userId, offset)
}

func AcceptJoin(groupId models.Group_Invi, userid int) (error, int) {
	if repo.GeTIdofAdminOfGroup(groupId.GroupId) != userid {
		return errors.New("you have no right to this "), http.StatusUnauthorized
	}
	err := repo.JoinToGroup(groupId.GroupId, groupId.UserId)
	if err != nil {
		return errors.New("field to join to group"), http.StatusInternalServerError
	}
	return nil, http.StatusOK
}
