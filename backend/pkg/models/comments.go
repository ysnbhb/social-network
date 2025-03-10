package models

type CommentRequest struct {
	Id         int    `json:"id"`
	UserId     int    `json:"userId"`
	CardId     int    `json:"cardId"`
	TargetId   int    `json:"targetId"`
	Content    string `json:"content"`
	GroupId    int    `json:"groupId"`
	CreatedAt  string `json:"createdAt"`
	ImageUrl   string `json:"imageUrl"`
	ImgContant []byte `json:"-"`
}

type CommentResponse struct {
	Id            int    `json:"id"`
	UserId        int    `json:"userId"`
	CardId        int    `json:"cardId"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	NickName      string `json:"nickName"`
	Content       string `json:"content"`
	ImageUrl      string `json:"imageUrl"`
	AvatarUrl     string `json:"avatarUrl"`
	CreatedAt     string `json:"createdAt"`
	TotalLikes    int    `json:"totalLikes"`
	TotalDislikes int    `json:"totalDislikes"`
	TotalComments int    `json:"totalComments"`
	IsLiked       bool   `json:"isLiked"`
}
