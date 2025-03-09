package models

import (
	"time"
)

type User struct {
	Id           int       `json:"id"`
	Email        string    `json:"email"`
	Password     string    `json:"password"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	DateOfBirth  string    `json:"dateOfBirth"`
	AvatarUrl    string    `json:"avatarUrl"`
	NickName     string    `json:"nickName"`
	AboutMe      string    `json:"aboutMe"`
	CreatedAt    time.Time `json:"createdAt"`
	Status       string    `json:"status"`
	Profile_Type string    `json:"profile_type"`
	ImgContant   []byte    `json:"-"`
}

type Login struct {
	Id             int    `json:"id"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	HashedPassword string
}
type UserProfile struct {
	Id              int       `json:"id"`
	FirstName       string    `json:"firstName"`
	LastName        string    `json:"lastName"`
	NickName        string    `json:"nickName"`
	Email           string    `json:"email"`
	DateOfBirth     time.Time `json:"dateOfBirth"`
	AvatarUrl       string    `json:"avatarUrl"`
	AboutMe         string    `json:"aboutMe"`
	Image_count     int       `json:"image_count"`
	Follower_count  int       `json:"follower_count"`
	Following_count int       `json:"following_count"`
	Count_Posts     int       `json:"posts_count"`
}

type Userdataforchat struct {
	Id       int    `json:"id"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
}

type UserBySearch struct {
	Id        int    `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Nickname  string `json:"nickname"`
	Avatar    any    `json:"avatar"`
}
