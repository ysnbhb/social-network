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
	if (user.NickName) == "" {
		user.NickName = utils.GenerateUsername(user.FirstName, user.LastName)
		for err = repo.CheckNickName(user.NickName, user.Id); err != nil; {
			user.NickName = utils.GenerateUsername(user.FirstName, user.LastName)
		}
	} else {
		err = repo.CheckNickName(user.NickName, user.Id)
	}
	if err != nil {
		return errors.New("nickname already exist")
	}
	if len(user.ImgContant) != 0 {
		user.AvatarUrl, err = utils.SaveImg(user.ImgContant)
		if err != nil {
			return errors.New("field to save image")
		}
	} else {
		user.AvatarUrl = "/uploads/default.webp"
	}
	err = repo.CreateUser(user)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func LoginUser(user *models.Login) (string, error) {
	err := repo.CheckEmail(user.Email)
	if err == nil {
		return "", errors.New("sorry, this email does not exist")
	}

	repo.GetUserId(user)
	repo.GetPassword(user)
	username, err := repo.GetUserNameByEmail(user.Email)
	if err != nil {
		return "", err
	}
	err = utils.ComparePassword(user)
	if err != nil {
		return "", errors.New("sorry, your password was incorrect")
	}
	return username, nil
}

func LogoutUser(userId int) error {
	err := repo.DeleteSessionUser(userId)
	return err
}

func UpdateProfile(user *models.User) error {
	err := repo.CheckNickName(user.NickName, user.Id)
	if err != nil {
		return err
	}
	err = repo.UpdateProfile(user)
	return err
}
