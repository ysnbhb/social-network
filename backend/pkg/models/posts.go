package models

type PostRequest struct {
	Id        int    `json:"id"`
	UserId    int    `json:"userId"`
	GroupId   int    `json:"groupId"`
	CardId    int    `json:"cardId"`
	Content   string `json:"content"`
	Privacy   string `json:"privacy"` // public or private or almost_private 
	ImageUrl  string `json:"imageUrl"`
	CreatedAt string `json:"createdat"`
}
