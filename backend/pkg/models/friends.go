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

type UserRelation struct {
	Following []UnfollowUser // Replace User with your actual user type
	Follower  []UnfollowUser
}
