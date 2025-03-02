package models

type Friends struct {
	Id             int    `json:"id"`
	FirstName      string `json:"firstName"`
	LastName       string `json:"lastName"`
	Nickname       string `json:"nickname"`
	Avatar         any    `json:"avatar"`
	Sendmessage    bool   `json:"sendmessage"`
	NotificationId int    `json:"notificationid"`
}

type UnfollowUser struct {
	Id        int    `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Nickname  string `json:"nickname"`
	Avatar    any    `json:"avatar"`
}
