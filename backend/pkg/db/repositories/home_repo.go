package repo

import (
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
    c.group_id, 
    u.first_name,
    u.last_name,
	u.nickname,
    p.privacy,
    COUNT(DISTINCT cm.id) AS total_comments,
    COUNT(DISTINCT CASE WHEN l.reaction_type = 1 THEN l.id END) AS total_likes,
    COUNT(DISTINCT CASE WHEN l.reaction_type = -1 THEN l.id END) AS total_dislikes,
	(SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = c.id AND user_id = $1)) AS isliked
	FROM card c
	JOIN posts p ON c.id = p.card_id
	JOIN users u ON c.user_id = u.id
	LEFT JOIN comments cm ON c.id = cm.target_id
	LEFT JOIN likes l ON c.id = l.card_id
	WHERE (p.privacy = 'public' AND p.privacy = 'public' AND  (c.group_id is NULL  or c.group_id = 0)) OR
    ((p.privacy = 'almost_private') AND 
     EXISTS (SELECT 1 FROM followers WHERE (follower_id = u.id AND following_id = $1)  AND status = 'accept')
    )
	GROUP BY 
    c.id, 
    c.user_id, 
    c.content, 
    c.created_at, 
    u.first_name, 
    u.last_name,
	u.nickname
	ORDER BY c.created_at DESC
	LIMIT 10 OFFSET $2
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
			&post.TotalComments,
			&post.TotalLikes,
			&post.TotalDislikes,
			&post.IsLiked,
		)
		if err != nil {
			return err
		}
		*postsResponse = append(*postsResponse, post)
	}

	return rows.Err()
}
