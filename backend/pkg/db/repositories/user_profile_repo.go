package repo

import (
	"log"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func GetCreatedUserPosts(postsResponse *[]models.PostsResponse, userId int, username string, offset int) error {
	data, err := GetUserInfoByUsername(username)
	if err != nil {
		return err
	}
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
WHERE (
    -- Case 1: The viewer ($1) is viewing their own profile
    (c.user_id = $1 AND u.id = $2)
    OR 
    -- Case 2: The viewer ($1) is viewing another user's profile ($2)
    (u.id = $2 AND 
        (
            -- Public profile with public posts
            (u.profile_type = 'Public' AND p.privacy = 'public' AND (c.group_id IS NULL OR c.group_id = 0))
            OR 
            -- Almost private posts where the viewer is an accepted follower
            (p.privacy = 'almostPrivate' AND 
                EXISTS (
                    SELECT 1 
                    FROM followers 
                    WHERE follower_id = $1 AND following_id = $2 AND status = 'accept'
                )
            )
            OR 
            -- Private posts where the viewer is a private member
            (p.privacy = 'private' AND 
                EXISTS (
                    SELECT 1 
                    FROM private_members 
                    WHERE post_id = p.id AND user_id = $1
                )
            )
            OR 
            -- Private profile with public posts where the viewer is an accepted follower
            (u.profile_type = 'Private' AND p.privacy = 'public' AND 
                EXISTS (
                    SELECT 1 
                    FROM followers 
                    WHERE follower_id = $1 AND following_id = $2 AND status = 'accept'
                ) AND
                (c.group_id IS NULL OR c.group_id = 0)
            )
        )
    )
)
GROUP BY 
    c.id, 
    c.user_id, 
    c.content, 
    c.created_at,
    u.avatar_url,
    u.first_name, 
    u.last_name,
    u.nickname
ORDER BY c.created_at DESC;
			`
	rows, err := db.DB.Query(query, userId, data.Id, offset)
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

func InfoUserProfile(profile *models.UserProfile, username string, userId int) error {
	query := `SELECT 
    s.user_uuid,
    u.id,
    u.first_name,
    u.last_name,
    u.nickname,
    COALESCE(u.about_me, '') AS about_me,
    u.email,
    u.date_of_birth,
    u.profile_type,
    COALESCE(u.avatar_url, '') AS avatar_url,
    COUNT(DISTINCT CASE WHEN c.image_url IS NOT NULL AND c.image_url <> '' THEN c.image_url END) AS image_count,
    COUNT(DISTINCT p.id) AS posts,
    COUNT(DISTINCT CASE WHEN f1.follower_id != ? THEN f1.follower_id END) AS follower_count, 
    COUNT(DISTINCT CASE WHEN f2.following_id != ? THEN f2.following_id END) AS following_count
FROM users u 
    JOIN sessions s ON s.user_id = u.id
    LEFT JOIN card c ON c.user_id = u.id
LEFT JOIN followers f1 ON f1.following_id = u.id AND f1.status != 'pending'
    LEFT JOIN followers f2 ON f2.follower_id = u.id AND f2.status != 'pending'
    LEFT JOIN posts p ON p.card_id = c.id
WHERE u.nickname = ?

GROUP BY 
    s.user_uuid,
    u.id,
    u.first_name,
    u.last_name,
    u.nickname,
    u.about_me,
    u.email,
    u.date_of_birth,
    u.profile_type,
    u.avatar_url;`
	err := db.DB.QueryRow(query, userId, userId, username).Scan(&profile.Uuid, &profile.Id, &profile.FirstName, &profile.LastName, &profile.NickName, &profile.AboutMe, &profile.Email, &profile.DateOfBirth, &profile.Profile_Type, &profile.AvatarUrl, &profile.Image_count, &profile.Count_Posts, &profile.Follower_count, &profile.Following_count)
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

func GetUserFollowing(current_userId int, my_userid int) (friend []models.UnfollowUser, errs error) {
	following := `SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.nickname,
    u.avatar_url,
    CASE 
        WHEN $1 = $2 THEN COALESCE(f.status, '') 
        ELSE COALESCE((
            SELECT status 
            FROM followers 
            WHERE follower_id = $1 AND following_id = u.id 
        ), '')
    END AS status
	FROM users u
	JOIN followers f ON u.id = f.following_id
	WHERE 
    f.follower_id = $2 
 	AND u.id!=$1
    AND 
    (
        ($1 = $2) 
        OR 
         (
            (u.profile_type = 'Public') 
            OR 
            (u.profile_type = 'Private' AND EXISTS (
                SELECT 1 
                FROM followers 
                WHERE follower_id = $2 AND following_id = u.id AND (status = 'accept' OR status = 'pending')
            ))  
        )
    );
`

	row, err := db.DB.Query(following, my_userid, current_userId)
	if err != nil {
		return friend, err
	}
	for row.Next() {
		f := models.UnfollowUser{}
		err := row.Scan(&f.Id, &f.FirstName, &f.LastName, &f.Nickname, &f.Avatar, &f.Status)
		if err != nil {
			return friend, err
		}
		friend = append(friend, f)
	}
	return friend, nil
}

func GetUserFollower(current_userId int, my_userid int) (friend []models.UnfollowUser, errs error) {
	follower := `
	SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.nickname,
    u.avatar_url,
    CASE 
         WHEN $1 != $2 THEN
            COALESCE(
                (SELECT status 
                 FROM followers 
                 WHERE following_id = $1 AND follower_id = u.id),
                ''
            )
         
        WHEN $1 = $2 AND EXISTS (
                SELECT 1 
                FROM followers 
                WHERE following_id = $1 AND follower_id = u.id
            ) THEN  
            COALESCE(
            (SELECT status 
             FROM followers 
             WHERE following_id = $1 AND follower_id = u.id),
            ''
        )
    END AS status
	FROM users u
	JOIN followers f ON u.id = f.follower_id 
	WHERE 
    f.following_id = $2  
    AND u.id != $1  
    AND 
    (
         ($1 = $2) 
        OR 
         (
            (u.profile_type = 'Public')  
            OR 
            (u.profile_type = 'Private' AND EXISTS (
                SELECT 1 
                FROM followers 
                WHERE follower_id = u.id AND following_id = $2 AND (status = 'accept' OR status = 'pending')
            ))  
        )
    );
`
	row, err := db.DB.Query(follower, my_userid, current_userId)
	if err != nil {
		log.Println(err)
		return friend, err
	}
	for row.Next() {
		f := models.UnfollowUser{}
		err := row.Scan(&f.Id, &f.FirstName, &f.LastName, &f.Nickname, &f.Avatar, &f.Status)
		if err != nil {
			return friend, err
		}
		friend = append(friend, f)
	}
	return friend, nil
}

func GetIsFollowing(userId int, profileId int) string {
	query := ` SELECT 
    f.status
FROM followers f
LEFT JOIN users u ON f.following_id = u.id
WHERE 
    f.follower_id = $1 -- Viewer ID
    AND f.following_id = $2 -- Target User ID
    AND (
        -- Case 1: Viewer is viewing their own profile
        ($1 = $2)
        OR 
        -- Case 2: Profile is public
        (u.profile_type = 'Public')
        OR 
        -- Case 3: Profile is private and there is an accepted or pending follow relationship
        (
            u.profile_type = 'Private'
            AND EXISTS (
                SELECT 1
                FROM followers
                WHERE follower_id = $1
                  AND following_id = $2
                  AND status IN ('accept', 'pending')
            )
        )
    );`
	var status string
	err := db.DB.QueryRow(query, userId, profileId).Scan(&status)
	if err != nil {
		return err.Error()
	}
	return status
}
