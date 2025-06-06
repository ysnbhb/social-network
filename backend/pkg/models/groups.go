package models

type Groups struct {
	Id           int    `json:"id"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	Owner        int    `json:"owner"`
	Create_date  string `json:"createDate"`
	Status       string `json:"status"`
	IsMember     bool   `json:"isMember"`
	TotalMembers int    `json:"totalMembers"`
}

type Group_Invi struct {
	GroupId int    `json:"groupId"`
	UserId  int    `json:"userId"`
	Status  string `json:"status"`
	Sender  string `json:"sender"`
}

type Group_Jion struct {
	GroupId    int `json:"groupId"`
	AcceptJoin int `json:"acceptJoin"`
}

type Group struct {
	Id        int    `json:"id"`
	GroupId   int    `json:"groupId"`
	UserId    int    `json:"userId"`
	Status    string `json:"status"`
	CreatedAt string `json:"createdAt"`
}

type Event struct {
	Id           int    `json:"id"`
	GroupId      int    `json:"groupId"`
	CreatorId    int    `json:"userId"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	StartDate    string `json:"date"`
	Status       string `json:"status"`
	Creator_User string `json:"creator_user"`
}

type RespoEvent struct {
	Id     int    `json:"eventId"`
	Status string `json:"status"`
}

type GroupMember struct {
	Id       int    `json:"id"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
}
