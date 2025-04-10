package utils

import (
	"errors"
	"fmt"
	"math/rand"
	"net/mail"
	"regexp"
	"strconv"
	"strings"
	"time"

	"social-network/pkg/models"
)

func ValidateUser(user *models.User) error {
	firstName := regexp.MustCompile(`^[a-zA-Z]{3,10}$`)
	if !firstName.MatchString(user.FirstName) {
		return errors.New("invalid first name")
	}

	lastName := regexp.MustCompile(`^[a-zA-Z]{3,10}$`)
	if !lastName.MatchString(user.LastName) {
		return errors.New("invalid last name")
	}

	nickName := regexp.MustCompile(`^[a-zA-Z0-9][\w]{2,10}[a-zA-Z0-9]$`)
	if !nickName.MatchString(user.NickName) && user.NickName != "" {
		return errors.New("invalid nickname")
	}

	t := time.Now()
	year := t.Year()
	yearOfBirthS := user.DateOfBirth[:4]
	yearOfBirthInt, err := strconv.Atoi(yearOfBirthS)
	if err != nil {
		return err
	}
	if year-yearOfBirthInt < 16 {
		return errors.New("sorry, this service is only available to users who are 16 years or older")
	} else if year-yearOfBirthInt > 100 {
		return errors.New("invalid age. please enter a realistic birthdate")
	}
	_, err = mail.ParseAddress(user.Email)
	if err != nil {
		return errors.New("invalid email")
	}

	password := regexp.MustCompile(`^[a-zA-Z0-9][\w]{2,10}[a-zA-Z0-9]$`)
	if !password.MatchString(user.Password) {
		return errors.New("invalid password")
	}

	return nil
}

func GenerateUsername(firstName, lastName string) string {
	rand.NewSource(time.Now().UnixNano())

	formats := []string{
		firstName + lastName,
		firstName + "." + lastName,
		firstName + "_" + lastName,
		firstName + fmt.Sprintf("%d", rand.Intn(900)+100),
		lastName + fmt.Sprintf("%d", rand.Intn(900)+100),
	}

	username := formats[rand.Intn(len(formats))]
	return strings.ToLower(username)
}
