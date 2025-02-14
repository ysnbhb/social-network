package models

import "time"

type User struct {
	Id          int       `json:"id"`
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	FirstName   string    `json:"firstName"`
	LastName    string    `json:"lastName"`
	DateOfBirth time.Time `json:"dateOfBirth"`
	AvatarUrl   string    `json:"avatarUrl"`
	NickName    string    `json:"nickName"`
	AboutMe     string    `json:"aboutMe"`
	CreatedAt   time.Time `json:"createdAt"`
	Status      string    `json:"status"`
}

type Login struct {
	Id             int    `json:"id"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	HachedPassword string
}
