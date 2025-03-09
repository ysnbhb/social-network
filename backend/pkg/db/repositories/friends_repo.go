package repo

import (
	"social-network/pkg/models"

	db "social-network/pkg/db/sqlite"
)

func GetFriends(Friends *[]models.Friends, userId int) error {
	query := `
SELECT DISTINCT
    u.id,
    u.first_name,
    u.last_name,
    u.nickname,
    u.avatar_url
FROM users u
LEFT JOIN followers f1 ON u.id = f1.following_id AND f1.follower_id = ? AND f1.status = 'accepted'
LEFT JOIN followers f2 ON u.id = f2.follower_id AND f2.following_id = ? AND f2.status = 'accepted'
LEFT JOIN chats c ON (u.id = c.sender_id AND c.recipient_id = ?)
                    OR (u.id = c.recipient_id AND c.sender_id = ?)
WHERE
    f1.following_id IS NOT NULL
    OR f2.follower_id IS NOT NULL
    OR c.id IS NOT NULL
GROUP BY u.id, u.first_name, u.last_name, u.nickname, u.avatar_url
ORDER BY
    CASE WHEN MAX(c.sent_at) IS NOT NULL THEN 1 ELSE 2 END,
    MAX(c.sent_at) DESC,
    u.nickname ASC;
    `

	rows, err := db.DB.Query(query, userId, userId, userId, userId)
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
	WHERE NOT EXISTS (
    SELECT 1 FROM followers 
    	WHERE follower_id = $1 AND following_id = u.id  
	)
	AND u.id != $1  
	ORDER BY RANDOM()
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

