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
		return err
	}

	err = repo.CheckNickName(user.NickName)
	if err != nil {
		return err
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
	err = utils.ComparePasword(user)
	if err != nil {
		return errors.New("sorry, your password was incorrect")
	}
	return nil
}

func LogoutUser(userId int) error {
	err := repo.DeletteSessionUser(userId)
	return err
}