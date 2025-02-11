package models

type CommentRequest struct {
	Id        int    `json:"id"`
	UserId    int    `json:"userId"`
	CardId    int    `json:"cardId"`
	TargetId  int    `json:"targetId"`
	Content   string `json:"content"`
	CreatedAt string `json:"createdAt"`
}
