package repo

import (
	"fmt"
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func AddComment(commentRequest *models.CommentRequest) error {
	cardId, err := CreateCard(commentRequest.UserId, 0, commentRequest.Content, "")
	if err != nil {
		return err
	}

	query := `INSERT INTO comments(card_id, target_id) VALUES(?, ?);`
	_, err = db.DB.Exec(query, cardId, commentRequest.TargetId)
	return err
}

func GetComments(commentsResponse *[]models.CommentResponse, userId int, targetcardId int) error {
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
		(SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = c.id AND user_id = ?)) AS isliked
	FROM card c
	JOIN comments cm ON c.id = cm.card_id
	JOIN users u ON c.user_id = u.id
	LEFT JOIN likes l ON c.id = l.card_id
	WHERE cm.target_id = ?
	GROUP BY 
		c.id, 
		c.user_id, 
		c.content, 
		c.created_at, 
		u.first_name, 
		u.last_name,
		u.nickname,
		c.image_url,
		u.avatar_url
	ORDER BY c.created_at DESC;
	`

	rows, err := db.DB.Query(query, userId, targetcardId) // Fixed argument order
	if err != nil {
		return err
	}
	defer rows.Close()

	// Ensure slice is initialized
	if *commentsResponse == nil {
		*commentsResponse = make([]models.CommentResponse, 0)
	}

	for rows.Next() {
		var comment models.CommentResponse
		err := rows.Scan(
			&comment.Id,
			&comment.UserId,
			&comment.Content,
			&comment.CreatedAt,
			&comment.FirstName,
			&comment.LastName,
			&comment.NickName,
			&comment.ImageUrl,
			&comment.AvatarUrl,
			&comment.TotalComments,
			&comment.TotalLikes,
			&comment.IsLiked,
		)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			continue
		}
		*commentsResponse = append(*commentsResponse, comment)
	}

	return rows.Err()
}
