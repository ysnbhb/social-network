package models

type ReactionRequest struct {
	UserId       int `json:"userId"`
	CardId       int `json:"cardId"`
	ReactionType int `json:"reactionType"` // 1 for like, -1 for dislike
}

type ReactionResponse struct {
	LikesCount    int `json:"likesCount"`
	DislikesCount int `json:"dislikesCount"`
	UserReaction  int `json:"userReaction"`
}
