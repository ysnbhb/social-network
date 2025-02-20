package services

import (
	"errors"
	"html"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) error {
	FollowingId := repo.CheckUserExist(followRequest.FollowingId)//CheckExtsUser(followRequest.FollowingId)
	if !FollowingId {
		return errors.New("This User Is Not Exist")
	}
	followRequest.Status = html.EscapeString(followRequest.Status)
	err := repo.AddFollow(followRequest)
	if err != nil {
		return errors.New("Follow User in db: " + err.Error())
	}
	return nil
}
