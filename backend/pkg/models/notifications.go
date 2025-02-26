package models

type UnreadNotification struct {
	Id         int
	Username     string
	Sender     string
	Type       string
	Details    string
	Readstatus string
}
