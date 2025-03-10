package repo

import (
	"log"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) (bool, error) {
	existing := GetExistingFollow(followRequest.FollowerId, followRequest.FollowingId)
	exists := false 
	if existing {
		err := DeleteFollow(followRequest.FollowerId, followRequest.FollowingId)
		followRequest.Status = ""
		exists = false
		if err != nil {
			return exists, err
		}
	} else if !existing {
		err := insertFollow(followRequest.FollowerId, followRequest.FollowingId, followRequest.Status)
		exists = true
		return exists , err
	}

	return exists ,nil
}

func insertFollow(FollowerId, FollowingId int, Status string) error {
	query := `INSERT INTO followers (follower_id, following_id, status) VALUES (?, ?, ?)`
	_, err := db.DB.Exec(query, FollowerId, FollowingId, Status)
	return err
}

func DeleteFollow(FollowerId, FollowingId int) error {
	query := `DELETE FROM followers WHERE follower_id = ? AND following_id = ?`
	_, err := db.DB.Exec(query, FollowerId, FollowingId)
	return err
}

func GetExistingFollow(FollowerId, FollowingId int) bool {
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ?)`
	err := db.DB.QueryRow(query, FollowerId, FollowingId).Scan(&exists)
	if err != nil {
		log.Println("error checking existing follow:", err)
		return false
	}
	return exists
}

func IsFollowing(FollowerId, FollowingId int) bool {
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ? AND status = ?)`
	err := db.DB.QueryRow(query, FollowerId, FollowingId, "accept").Scan(&exists)
	if err != nil {
		log.Println("error checking existing follow:", err)
		return false
	}
	return exists
}
