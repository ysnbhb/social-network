package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetHomePosts(postsResponse *[]models.PostsResponse) error {
	query := `
	SELECT 
    c.id,
    c.user_id,
    c.content,
    c.created_at,
    u.first_name,
    u.last_name,
	u.nickname,
    COUNT(DISTINCT cm.id) AS total_comments,
    COUNT(DISTINCT CASE WHEN l.reaction_type = 1 THEN l.id END) AS total_likes,
    COUNT(DISTINCT CASE WHEN l.reaction_type = -1 THEN l.id END) AS total_dislikes
FROM card c
JOIN posts p ON c.id = p.card_id
JOIN users u ON c.user_id = u.id
LEFT JOIN comments cm ON c.id = cm.target_id
LEFT JOIN likes l ON c.id = l.card_id
WHERE p.privacy = "public"
GROUP BY 
    c.id, 
    c.user_id, 
    c.content, 
    c.created_at, 
    u.first_name, 
    u.last_name,
	u.nickname
ORDER BY c.created_at DESC;
	`
	rows, err := db.DB.Query(query)
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
		)
		if err != nil {
			return err
		}
		*postsResponse = append(*postsResponse, post)
	}

	return rows.Err()
}
