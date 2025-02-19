package models

type PostRequest struct {
	Id        int    `json:"id"`
	UserId    int    `json:"userId"`
	GroupId   int    `json:"groupId"`
	CardId    int    `json:"cardId"`
	Content   string `json:"content"`
	Privacy   string `json:"privacy"` // public or private or almost_private
	ImageUrl  string `json:"imageUrl"`
	CreatedAt string `json:"createdAt"`
}

type PostsResponse struct {
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
}
