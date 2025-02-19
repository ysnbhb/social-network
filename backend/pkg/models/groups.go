package models

type Groups struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Owner       int    `json:"owner"`
	Create_date string `json:"createDate"`
}

type Group_Invi struct {
	GroupId int `json:"groupId"`
	UserId  int `json:"userId"`
}
