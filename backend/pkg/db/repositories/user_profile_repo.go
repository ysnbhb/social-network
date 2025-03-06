package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetCreatedUserPosts(postsResponse *[]models.PostsResponse, username string , offset int) error {
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
			(SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = c.id AND user_id = $1)) AS isliked
		FROM card c
		JOIN posts p ON c.id = p.card_id
		JOIN users u ON c.user_id = u.id
		LEFT JOIN comments cm ON c.id = cm.target_id
		LEFT JOIN likes l ON c.id = l.card_id
		WHERE u.nickname = $1
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
	rows, err := db.DB.Query(query, username, offset)
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
			&post.AvatarUrl,
			&post.FirstName,
			&post.LastName,
			&post.NickName,
			&post.ImageUrl,
			&post.TotalComments,
			&post.TotalLikes,
			&post.IsLiked,
		)
		if err != nil {
			return err
		}
		*postsResponse = append(*postsResponse, post)
	}
	return rows.Err()
}

func InfoUserProfile(profile *models.UserProfile, username  string) error {
	query := `SELECT  
                u.id,
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
            LEFT JOIN followers f1 ON f1.following_id = u.id  
            LEFT JOIN followers f2 ON f2.follower_id = u.id   
            LEFT JOIN posts p on p.card_id=c.id
            WHERE u.nickname = ?
            GROUP BY u.id;`
	err := db.DB.QueryRow(query, username).Scan(&profile.Id, &profile.FirstName, &profile.LastName, &profile.NickName, &profile.AboutMe, &profile.Email, &profile.DateOfBirth, &profile.AvatarUrl, &profile.Image_count, &profile.Count_Posts, &profile.Follower_count, &profile.Following_count)
	if err != nil {
		return err
	}

	return nil
}

func GetStatusUesr(userId int) string {
	query := `SELECT profile_type FROM users WHERE id = ?`
	profile_type := "Not Found"
	db.DB.QueryRow(query, userId).Scan(&profile_type)
	return profile_type
}

func GetUserInfoByUsername(username string) (models.Userdataforchat, error) {
	query := `SELECT id, nickname, avatar_url FROM users WHERE nickname = ?`
	user := models.Userdataforchat{}
	err := db.DB.QueryRow(query, username).Scan(&user.Id, &user.Nickname, &user.Avatar)
	if err != nil {
		return user, err
	}
	return user, nil
}

func GetUserFollowing(userid int) (friend []models.UnfollowUser, errs error) {
 	following := `SELECT
    	 
    	u.first_name,
    	u.last_name,
    	u.nickname,
    	u.avatar_url
FROM users u 
JOIN followers f ON u.id = f.following_id 
WHERE f.follower_id = ?;`

	row, err := db.DB.Query(following, userid)
	if err != nil {
		return friend, err
	}
	for row.Next() {
		f := models.UnfollowUser{}
		err := row.Scan(&f.FirstName, &f.LastName, &f.Nickname, &f.Avatar)
		if err != nil {
			return friend, err
		}
		friend = append(friend, f)
	}
	return friend, nil
}

func GetUserFollower(userid int) (friend []models.UnfollowUser, errs error) {
	follower := ` SELECT
				u.first_name,
				u.last_name,
				u.nickname,
				u.avatar_url
		FROM users u 
		JOIN followers f ON u.id = f.follower_id 
		WHERE f.following_id=?;`
	row, err := db.DB.Query(follower, userid)
	if err != nil {
		return friend, err
	}
	for row.Next() {
		f := models.UnfollowUser{}
		err := row.Scan(&f.FirstName, &f.LastName, &f.Nickname, &f.Avatar)
		if err != nil {
			return friend, err
		}
		friend = append(friend, f)
	}
	return friend, nil
}
