package models

type Groups struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Owner       int    `json:"owner"`
	Create_date string `json:"createDate"`
	Status      string `json:"status"`
}

type Group_Invi struct {
	GroupId int `json:"groupId"`
	UserId  int `json:"userId"`
}
