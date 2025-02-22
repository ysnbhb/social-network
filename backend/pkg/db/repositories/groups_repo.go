package repo

import (
	"errors"
	"strings"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateGroup(gp models.Groups) error {
	query := `INSERT INTO groups(title  , description  , creator_id) VALUES (? , ? , ?)`
	res, err := db.DB.Exec(query, strings.TrimSpace(gp.Title), strings.TrimSpace(gp.Description), gp.Owner)
	if err != nil {
		return err
	}
	lastId, err := res.LastInsertId()
	if err != nil {
		return err
	}
	query = `INSERT INTO group_members(group_id , user_id )`
	_, err = db.DB.Exec(query, lastId, gp.Owner)
	return err
}

func MemberGroup(groupId int) ([]models.User, error) {
	query := ` SELECT   users.nickname , users.avatar_url FROM users INNER JOIN group_members
	ON users.id = group_members.user_id 
	WHERE group_members.group_id = ?
	`
	row, err := db.DB.Query(query, groupId)
	if err != nil {
		return nil, errors.New("field to fetch user")
	}
	users := []models.User{}
	for row.Next() {
		user := models.User{}
		err = row.Scan(&user.NickName, &user.AvatarUrl)
		if err != nil {
			continue
		}
		users = append(users, user)
	}
	return users, nil
}

func JoinToGroup(groupId, userid int) error {
	query := `INSERT INTO group_members(group_id , user_id) VALUES(? , ?)`
	_, err := db.DB.Exec(query, groupId, userid)
	return err
}

func CheckGroup(groupId int) bool {
	exists := false
	query := `SELECT EXISTS (
		SELECT 1 FROM groups WHERE id = ?
	)`
	db.DB.QueryRow(query).Scan(&exists)
	return exists
}

func CheckUserInGroup(groupId, userId int) bool {
	exists := false
	query := `SELECT EXISTS (
		SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ? 
	)`
	db.DB.QueryRow(query, groupId, userId).Scan(&exists)
	return exists
}

func GeTIdofAdminOfGroup(groupId int) int {
	var id int
	query := `SELECT creator_id FROM groups WHERE id =?`
	db.DB.QueryRow(query, groupId).Scan(&id)
	return id
}

func HasInvi(groupId, userId int) (string, error) {
	exists := ""
	query := `SELECT status FROM group_invitations WHERE group_id = ? AND user_id = ? `
	err := db.DB.QueryRow(query, groupId, userId).Scan(&exists)
	return exists, err
}

func InsertIntoGroup_Invi(groupId, userId int, status string) error {
	query := `INSERT INTO group_invitations(group_id , user_id , status) VALUES(? ,? , ?)`
	_, err := db.DB.Exec(query, groupId, userId, status)
	return err
}

func Delete_group_Invi(groupId, userid int) {
	query := `DELETE FROM group_invitations WHERE group_id = ? AND user_id = ?`
	db.DB.Exec(query, groupId, userid)
}

func GetGroupPost(groupId, offste, userid int) ([]models.PostsResponse, error) {
	posts := []models.PostsResponse{}
	query := `
    SELECT 
        u.nickname, 
        u.avatar_url, 
        u.first_name, 
        u.last_name, 
        c.id, 
        c.content, 
        c.image_url, 
        c.created_at,
        COUNT(DISTINCT cm.id) AS total_comments,
        COUNT(DISTINCT CASE WHEN l.reaction_type = 1 THEN l.id END) AS total_likes,
        COUNT(DISTINCT CASE WHEN l.reaction_type = -1 THEN l.id END) AS total_dislikes,
        (SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = c.id AND user_id = ?)) AS isliked
    FROM users u
    INNER JOIN card c ON u.id = c.user_id
    INNER JOIN posts p ON p.card_id = c.id
    LEFT JOIN comments cm ON cm.card_id = c.id  
    LEFT JOIN likes l ON c.id = l.card_id
    WHERE c.group_id = ?
    GROUP BY c.id, u.nickname, u.avatar_url, u.first_name, u.last_name, c.content, c.image_url, c.created_at
    ORDER BY c.created_at DESC
    LIMIT 10 OFFSET ?;  
	`
	rows, err := db.DB.Query(query, groupId, userid, offste)
	if err != nil {
		return nil, errors.New("field to get post")
	}
	for rows.Next() {
		post := models.PostsResponse{}
		err = rows.Scan(&post.NickName, &post.AvatarUrl, &post.FirstName, &post.LastName, &post.Id, &post.Content, &post.ImageUrl, &post.CreatedAt, &post.TotalComments, &post.TotalLikes, &post.TotalDislikes, &post.IsLiked)
		if err != nil {
			continue
		}
		posts = append(posts, post)
	}
	return posts, nil
}

func ListGroups(userid, offset int) ([]models.Groups, error) {
	query := `
    SELECT g.id, g.title, g.description ,
	(SELECT COALESCE(status, '') FROM group_invitations WHERE group_id = g.id)
    FROM groups g
    WHERE NOT EXISTS (
        SELECT 1 FROM group_members gm 
        WHERE gm.group_id = g.id 
        AND gm.user_id = ?
    )
    LIMIT 10 OFFSET ?;`

	rows, err := db.DB.Query(query, userid, offset)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description, &group.Status)
		groups = append(groups, group)
	}
	return groups, nil
}

func ListGroupsJoined(userid, offset int) ([]models.Groups, error) {
	query := `
    SELECT g.id, g.title, g.description ,
    FROM groups g
    WHERE EXISTS (
        SELECT 1 FROM group_members gm 
        WHERE gm.group_id = g.id 
        AND gm.user_id = ?
    )
    LIMIT 10 OFFSET ?;`

	rows, err := db.DB.Query(query, userid, offset)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description)
		groups = append(groups, group)
	}
	return groups, nil
}
