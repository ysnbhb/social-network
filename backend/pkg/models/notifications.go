package models

type UnreadNotification struct {
	Id         int
	Username   string
	Sender     string
	GroupId    int
	Type       string
	Details    string
	Readstatus string
	Sent_at    string
	
}
