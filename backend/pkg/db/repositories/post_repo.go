package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreatPost(postRequest *models.PostRequest) (*models.PostsResponse, error) {
	cardId, err := CreateCard(postRequest.UserId, postRequest.GroupId, postRequest.Content, postRequest.ImageUrl)
	if err != nil {
		return nil, err
	}

	query := `INSERT INTO posts(card_id, privacy) VALUES(?, ?);`
	_, err = db.DB.Exec(query, cardId, postRequest.Privacy)
	if err != nil {
		return nil, err
	}
	return GetOneCard(cardId)
}

func GetOneCard(cardId int) (*models.PostsResponse, error) {
	var post *models.PostsResponse
	query := `SELECT 
    c.id,
    c.user_id,
    c.content,
    c.created_at,
    c.group_id, 
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
	WHERE c.id = ?`
	err := db.DB.QueryRow(query, cardId).Scan(
		&post.Id,
		&post.UserId,
		&post.Content,
		&post.CreatedAt,
		&post,
		&post.FirstName,
		&post.LastName,
		&post.NickName,
		&post.TotalComments,
		&post.TotalLikes,
		&post.TotalDislikes,
	)
	//
	return post, err
}
