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
		err = row.Scan(user.NickName, user.AvatarUrl)
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
	db.DB.QueryRow(query, groupId).Scan(id)
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

func GetGroupPost(groupId, offste int) ([]models.PostsResponse, error) {
	posts := []models.PostsResponse{}
	query := `
	SELECT u.nickname , u.avatar_url , u.first_name , u.last_name , c.id , c.content , c.image_url , c.created_at FROM users u
	INNER JOIN card c ON u.id = c.user_id
	INNER JOIN posts p 
	ON p.card_id = c.id
	WHERE c.group_id = ?
	ORDER BY c.created_at DESC
	LIMIT "10" OFFSET ?
	`
	rows, err := db.DB.Query(query, groupId, offste)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		post := models.PostsResponse{}
		err = rows.Scan(post.NickName, post.AvatarUrl, post.FirstName, post.LastName, post.CardId, post.Content, post.ImageUrl, post.CreatedAt)
		if err != nil {
			continue
		}
		posts = append(posts, post)
	}
	return posts, nil
}
