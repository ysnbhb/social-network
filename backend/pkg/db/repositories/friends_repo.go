package repo

import (
	"social-network/pkg/models"

	db "social-network/pkg/db/sqlite"
)

func GetFriends(Friends *[]models.Friends, userId int) error {
	query := `
    SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.nickname,
        u.avatar_url
    FROM users u
    WHERE (u.id IN (
            SELECT f.following_id
            FROM followers f
            WHERE f.follower_id = ? AND f.status = 'accepted'
        )
        OR u.id IN (
            SELECT f.follower_id
            FROM followers f
            WHERE f.following_id = ? AND f.status = 'accepted'
        )
        OR u.profile_type = 'public')
    ORDER BY u.nickname ASC;
`

	rows, err := db.DB.Query(query, userId, userId)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		var friend models.Friends
		err := rows.Scan(
			&friend.Id,
			&friend.FirstName,
			&friend.LastName,
			&friend.Nickname,
			&friend.Avatar,
		)
		if err != nil {
			return err
		}
		*Friends = append(*Friends, friend)
	}
	return rows.Err()
}

func GetFollowers(userId int) ([]models.UnfollowUser, error) {
	unfu := []models.UnfollowUser{}
	query := `
    SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.nickname,
        u.avatar_url
    FROM users u
    WHERE u.id NOT IN (
        SELECT f.follower_id
        FROM followers f
        WHERE f.following_id = $1 AND f.follower_id = u.id
    ) AND u.id != $1
    ORDER BY random()
	LIMIT 5;
`
	rows, err := db.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var follower models.UnfollowUser
		err := rows.Scan(
			&follower.Id,
			&follower.FirstName,
			&follower.LastName,
			&follower.Nickname,
			&follower.Avatar,
		)
		if err != nil {
			continue
		}
		unfu = append(unfu, follower)
	}
	return unfu, err
}
