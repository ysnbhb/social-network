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
