package models

type ReactionRequest struct {
	UserID       int `json:"userId"`
	CardID       int `json:"cardId"`
	ReactionType int `json:"reactionType"` // 1 for like, -1 for dislike, 0 for remove reaction
}

type ReactionResponse struct {
    LikesCount    int `json:"likesCount"`
    DislikesCount int `json:"dislikesCount"`
    UserReaction  int `json:"userReaction"`
}
