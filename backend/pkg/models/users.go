package models

import "time"

type User struct {
	Id          int       `json:"id"`
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	FirstName   string    `json:"firstname"`
	LastName    string    `json:"lastname"`
	DateOfBirth time.Time `json:"dateofbirth"`
	AvatarUrl   string    `json:"avatarurl"`
	NickName    string    `json:"nickname"`
	AboutMe     string    `json:"aboutme"`
	CreatedAt   time.Time `json:"createdat"`
	Status      string    `json:"status"`
}

type Login struct {
	Id          int       `json:"id"`
	Email       string    `json:"email"`
	Password    string    `json:"password"`
	HachedPassword string
}