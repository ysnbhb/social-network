package models

import "time"

type Session struct {
	Id int
	UserId int
	UserUUID string
	ExpiresAt time.Time
}