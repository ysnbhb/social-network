package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetCreatedUserPosts(postsResponse *[]models.PostsResponse, userId int) error {
	query := `
		SELECT 
			 c.id,
			c.user_id,
			c.content,
			c.created_at,
			u.avatar_url,
			u.first_name,
			u.last_name,
			u.nickname,
			c.image_url,
			COUNT(DISTINCT cm.id) AS total_comments,
			COUNT(DISTINCT CASE WHEN l.reaction_type = 1 THEN l.id END) AS total_likes,
			COUNT(DISTINCT CASE WHEN l.reaction_type = -1 THEN l.id END) AS total_dislikes
		FROM card c
		JOIN posts p ON c.id = p.card_id
		JOIN users u ON c.user_id = u.id
		LEFT JOIN comments cm ON c.id = cm.target_id
		LEFT JOIN likes l ON c.id = l.card_id
		WHERE u.id = ?
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
	rows, err := db.DB.Query(query, userId)
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var post models.PostsResponse
		err := rows.Scan(
			&post.CardId,
			&post.UserId,
			&post.Content,
			&post.CreatedAt,
			&post.AvatarUrl,
			&post.FirstName,
			&post.LastName,
			&post.NickName,
			&post.ImageUrl,
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

func InfoUserProfile(profile *models.UserProfile, user_id int) error {
	query := `SELECT  
			u.first_name,
			u.last_name,
			u.nickname,
			COALESCE(u.about_me, '') AS about_me,
			u.email,
			u.date_of_birth,
			COALESCE(u.avatar_url, '') AS avatar_url,
    		COUNT(DISTINCT CASE WHEN c.image_url IS NOT NULL AND c.image_url <> '' THEN c.image_url END) AS image_count,
			COUNT(DISTINCT p.id) AS posts,
			COUNT(DISTINCT f1.follower_id) AS follower_count,
			COUNT(DISTINCT f2.following_id) AS following_count
		FROM users u 
		LEFT JOIN card c ON c.user_id = u.id
		LEFT JOIN followers  f1 on f1.follower_id=u.id  
		LEFT JOIN followers  f2 on f2.following_id=u.id 
        LEFT JOIN posts p on p.card_id=c.id
		WHERE u.id = ?  
		GROUP BY u.id`
	err := db.DB.QueryRow(query, user_id).Scan(&profile.FirstName, &profile.LastName, &profile.NickName, &profile.AboutMe, &profile.Email, &profile.DateOfBirth, &profile.AvatarUrl, &profile.Image_count,&profile.Count_Posts, &profile.Follower_count, &profile.Following_count)
	if err != nil {
		return err
	}

	return nil
}

func GetStatusUesr(userId int) string {
	query := `SELECT profile_type FROM user WHERE id = ?`
	profile_type := "Not Found"
	db.DB.QueryRow(query).Scan(&profile_type)
	return profile_type
}
