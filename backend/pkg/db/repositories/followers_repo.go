package repo

import (
	"log"
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func AddFollow(followRequest *models.FollowRequest) error {
	existing := getExistingFollow(followRequest.FollowerId, followRequest.FollowingId)
	
	if existing {
		err := deleteFollow(followRequest.FollowerId, followRequest.FollowingId)
		if err != nil {
			return err
		}
	} else if !existing {
		err := insertFollow(followRequest.FollowerId, followRequest.FollowingId, followRequest.Status)
		return err
	}

	return nil
}

func insertFollow(FollowerId, FollowingId int, Status string) error {
	query := `INSERT INTO followers (follower_id, following_id, status) VALUES (?, ?, ?)`
	_, err := db.DB.Exec(query, FollowerId, FollowingId, Status)
	return err
}

func deleteFollow(FollowerId, FollowingId int) error {
	query := `DELETE FROM followers WHERE follower_id = ? AND following_id = ?`
	_, err := db.DB.Exec(query, FollowerId, FollowingId)
	return err
}

func getExistingFollow(FollowerId, FollowingId int) bool {
	var exists bool
	query := `SELECT EXISTS(SELECT 1 FROM followers WHERE follower_id = ? AND following_id = ?)`
	err := db.DB.QueryRow(query, FollowerId, FollowingId).Scan(&exists)
	if err != nil {
		log.Println("error checking existing follow:", err)
		return false
	}

	return exists
}
