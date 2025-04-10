package repo

import (
	"log"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetHomePosts(postsResponse *[]models.PostsResponse, userId int, offset int) error {
	query := `
SELECT 
    c.id,
    c.user_id,
    c.content,
    c.created_at,
    u.first_name,
    u.last_name,
    u.nickname,
    c.image_url,
    COALESCE(u.avatar_url , '') AS avatar_url,
    COUNT(DISTINCT cm.id) AS total_comments,
    COUNT(DISTINCT CASE WHEN l.reaction_type = 1 THEN l.id END) AS total_likes,
    (SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = c.id AND user_id = $1)) AS isliked
FROM card c
JOIN posts p ON c.id = p.card_id
JOIN users u ON c.user_id = u.id
LEFT JOIN comments cm ON c.id = cm.target_id
LEFT JOIN likes l ON c.id = l.card_id
LEFT JOIN post_visibility pv ON p.id = pv.post_id AND pv.user_id = $1
WHERE 
    (
        (u.profile_type = 'Public' AND p.privacy = 'public' AND (c.group_id IS NULL OR c.group_id = 0)) 
        OR 
        (p.privacy = 'almostPrivate' AND EXISTS (SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = u.id AND status = 'accept'))
        OR 
        (p.privacy = 'private' AND EXISTS (SELECT 1 FROM private_members WHERE post_id = p.id AND user_id = $1) 
            OR pv.user_id IS NOT NULL)
        OR 
        (u.profile_type = 'Private' AND p.privacy = 'public' AND EXISTS (SELECT 1 FROM followers WHERE follower_id = $1  AND following_id = u.id AND status = 'accept') AND (c.group_id IS NULL OR c.group_id = 0))
        OR 
        (c.user_id = $1 AND (c.group_id IS NULL OR c.group_id = 0))
    )
GROUP BY 
    c.id, 
    c.user_id, 
    c.content, 
    c.created_at, 
    u.first_name, 
    u.last_name,
    u.nickname
ORDER BY 
    c.created_at DESC
LIMIT 10 OFFSET $2;

`
	rows, err := db.DB.Query(query, userId, offset)
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var post models.PostsResponse
		err := rows.Scan(
			&post.Id,
			&post.UserId,
			&post.Content,
			&post.CreatedAt,
			&post.FirstName,
			&post.LastName,
			&post.NickName,
			&post.ImageUrl,
			&post.AvatarUrl,
			&post.TotalComments,
			&post.TotalLikes,
			&post.IsLiked,
		)
		if err != nil {
			log.Println(err)
			continue
		}
		*postsResponse = append(*postsResponse, post)
	}

	return rows.Err()
}

func GetPostInfo(postId int) (*models.PostInfo, error) {
	var post models.PostInfo
	query := `
	SELECT
    c.user_id,
    p.privacy,
    u.profile_type,
    c.group_id
	FROM card c
	JOIN posts p ON c.id = p.card_id
	JOIN users u ON c.user_id = u.id
	WHERE c.id = ?`
	err := db.DB.QueryRow(query, postId).Scan(
		&post.UserId,
		&post.Privacy,
		&post.PrivacyType,
		&post.GroupId,
	)
	return &post, err
}


