package services

import (
	"errors"
	"log"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func RegisterUser(user *models.User) error {
	err := repo.CheckEmail(user.Email)
	if err != nil {
		return errors.New("email already exist")
	}

	err = repo.CheckNickName(user.NickName)
	if err != nil {
		return errors.New("nickname already exist")
	}
	if len(user.ImgContant) != 0 {
		user.AvatarUrl, err = utils.SaveImg(user.ImgContant)
		if err != nil {
			return errors.New("field to save image")
		}
	}
	err = repo.CreateUser(user)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func LoginUser(user *models.Login) error {
	err := repo.CheckEmail(user.Email)
	if err == nil {
		return errors.New("sorry, this email does not exist")
	}
	repo.GetUserId(user)
	repo.GetPassword(user)
	err = utils.ComparePassword(user)
	if err != nil {
		return errors.New("sorry, your password was incorrect")
	}
	return nil
}

func LogoutUser(userId int) error {
	err := repo.DeleteSessionUser(userId)
	return err
}
