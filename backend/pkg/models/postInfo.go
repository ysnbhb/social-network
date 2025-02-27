package models

type PostInfo struct {
	Id          int    `json:"id"`
	Privacy     string `json:"type"`
	PrivacyType string `json:"user_type"`
	GroupId     int    `json:"group_id"`
	UserId      int    `json:"user_id"`
}
