package models

type FollowRequest struct {
	Id          int    `json:"id"`
	FollowerId  int    `json:"followerId"`
	FollowingId int    `json:"followingId"`
	Status      string `json:"status"`
	CreatedAt   string `json:"createdAt"`
}
