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
	Uuid      string `json:"uuid"`
	Id        int    `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Nickname  string `json:"nickname"`
	Avatar    any    `json:"avatar"`
	Status    string `json:"status"`
}

type UserRelation struct {
	Following []UnfollowUser // Replace User with your actual user type
	Follower  []UnfollowUser
}
