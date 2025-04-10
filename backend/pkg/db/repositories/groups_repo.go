package repo

import (
	"errors"
	"log"
	"strings"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateGroup(gp *models.Groups) error {
	query := `INSERT INTO groups(title  , description  , creator_id) VALUES (? , ? , ?)`
	res, err := db.DB.Exec(query, strings.TrimSpace(gp.Title), strings.TrimSpace(gp.Description), gp.Owner)
	if err != nil {
		return err
	}
	lastId, err := res.LastInsertId()
	if err != nil {
		return err
	}
	query = `INSERT INTO group_members(group_id , user_id ) VALUES (? , ?)`
	_, err = db.DB.Exec(query, lastId, gp.Owner)
	gp.Id = int(lastId)
	return err
}

func GroupInfo(gp int) (models.Groups, error) {
	group := models.Groups{}
	query := `SELECT 
    g.title,
    COUNT(DISTINCT gm.user_id) AS total_members
	FROM groups g
	INNER JOIN group_members gm ON g.id = gm.group_id
	WHERE g.id = ?
	GROUP BY g.id;`
	err := db.DB.QueryRow(query, gp).Scan(&group.Title, &group.TotalMembers)
	return group, err
}

func MemberGroup(groupId int, userId int) ([]models.GroupMember, error) {
	query := ` SELECT users.id, users.nickname , users.avatar_url FROM users INNER JOIN group_members
	ON users.id = group_members.user_id 
	WHERE group_members.group_id = ? AND group_members.user_id != ?
	`
	row, err := db.DB.Query(query, groupId, userId)
	if err != nil {
		return nil, errors.New("field to fetch user")
	}
	users := []models.GroupMember{}
	for row.Next() {
		user := models.GroupMember{}
		err = row.Scan(&user.Id, &user.Nickname, &user.Avatar)
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
	err := db.DB.QueryRow(query, groupId).Scan(&exists)
	if err != nil {
		log.Println(err)
	}
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
	if err != nil {
		return err
	}
	query = `INSERT INTO notifications (user_id, sender_id,group_id ,  type, details) VALUES (?, ?, ?, ? , ?)`
	adminid := GeTIdofAdminOfGroup(groupId)
	adminname := GetNickName(adminid)
	_, err = db.DB.Exec(query, adminid, userId, groupId, "group_request_join", GetNickName(userId)+" sent an invitation request to your group "+GetgroupnameById(groupId))
	adminconnections, ok := models.Clients[adminname]
	if ok {
		for _, conn := range adminconnections.Connections {
			err = conn.WriteJSON(map[string]interface{}{
				"type": "realNotification",
			})
			if err != nil {
				log.Println(err)
			}
		}
	}
	return err
}

func InsertIntoGroup_Invitation(groupId, userId int, senderId int, status string) error {
	query := `INSERT INTO group_invitations(group_id , user_id , status) VALUES(? ,? , ?)`
	_, err := db.DB.Exec(query, groupId, userId, status)
	if err != nil {
		return err
	}
	query = `INSERT INTO notifications (user_id, sender_id,group_id ,  type, details) VALUES (?, ?, ?, ? , ?)`
	_, err = db.DB.Exec(query, userId, senderId, groupId, "joingroup(accept/reject)", GetNickName(senderId)+" sent an invitation to join in "+GetgroupnameById(groupId))
	adminname := GetNickName(userId)
	adminconnections, ok := models.Clients[adminname]
	if ok {
		for _, conn := range adminconnections.Connections {
			err = conn.WriteJSON(map[string]interface{}{
				"type": "realNotification",
			})
			if err != nil {
				log.Println(err)
			}
		}
	}
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
    LEFT JOIN comments cm ON cm.target_id = c.id  
    LEFT JOIN likes l ON c.id = l.card_id
    WHERE c.group_id = ?
    GROUP BY c.id, u.nickname, u.avatar_url, u.first_name, u.last_name, c.content, c.image_url, c.created_at
    ORDER BY c.created_at DESC
    LIMIT 10 OFFSET ?;  
	`
	rows, err := db.DB.Query(query, userid, groupId, offste)
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

func ListGroups(userid int) ([]models.Groups, error) {
	query := `
   	SELECT 
    g.id, 
    g.title, 
    g.description,
    COALESCE((SELECT status
     FROM group_invitations 
     WHERE group_id = g.id 
     AND user_id = $1
     LIMIT 1) , '') AS invi,  
    (SELECT EXISTS (
        SELECT 1 FROM group_members 
        WHERE group_id = g.id 
        AND user_id = $1
    )) AS is_member,
    COALESCE(COUNT(DISTINCT gm.user_id), 0) AS total_members  
	FROM groups g
	LEFT JOIN group_members gm ON g.id = gm.group_id 
	GROUP BY g.id
	ORDER BY g.id;
	`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description, &group.Status, &group.IsMember, &group.TotalMembers)
		if err != nil {
			log.Println(err)
			continue
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func ListJionGroups(userid int) ([]models.Groups, error) {
	query := `
   	SELECT 
    g.id, 
    g.title, 
    g.description,
    COALESCE(COUNT(DISTINCT gm.user_id), 0) AS total_members  
	FROM groups g
	LEFT JOIN group_members gm ON g.id = gm.group_id 
    WHERE EXISTS (
        SELECT 1 FROM group_members 
        WHERE group_id = g.id 
        AND user_id = $1
    )
	GROUP BY g.id
	ORDER BY g.id;
	`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description, &group.TotalMembers)
		if err != nil {
			log.Println(err)
			continue
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func ListUnJoinGroups(userid int) ([]models.Groups, error) {
	query := `
   SELECT 
    g.id, 
    g.title, 
    g.description,
	g.creator_id,
    COALESCE(COUNT(DISTINCT gm.user_id), 0) AS total_members,
	COALESCE((SELECT status
     FROM group_invitations 
     WHERE group_id = g.id 
     AND user_id = $1
     LIMIT 1) , '') AS invi 
	FROM groups g
	LEFT JOIN group_members gm ON g.id = gm.group_id 
    WHERE NOT EXISTS (
        SELECT 1 FROM group_members 
        WHERE group_id = g.id 
        AND user_id = $1
    ) AND NOT EXISTS (
        SELECT 1 FROM group_invitations
        WHERE group_id = g.id
        AND user_id = $1
		AND status = 'invitation'
    )
	GROUP BY g.id
	ORDER BY g.id;
	`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description, &group.Owner, &group.TotalMembers, &group.Status)
		if err != nil {
			log.Println(err)
			continue
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func ListInviGroups(userid int) ([]models.Groups, error) {
	query := `
   SELECT 
    g.id, 
    g.title, 
    g.description,
    COALESCE(COUNT(DISTINCT gm.user_id), 0) AS total_members,
	COALESCE((SELECT status
     FROM group_invitations 
     WHERE group_id = g.id 
     AND user_id = $1
     LIMIT 1) , '') AS invi 
	FROM groups g
	LEFT JOIN group_members gm ON g.id = gm.group_id 
    WHERE NOT EXISTS (
        SELECT 1 FROM group_members 
        WHERE group_id = g.id 
        AND user_id = $1
    ) AND EXISTS (
        SELECT 1 FROM group_invitations
        WHERE group_id = g.id
        AND user_id = $1
		AND status = 'invitation'
    )
	GROUP BY g.id
	ORDER BY g.id;
	`
	rows, err := db.DB.Query(query, userid)
	if err != nil {
		return nil, err
	}
	groups := []models.Groups{}
	for rows.Next() {
		group := models.Groups{}
		err = rows.Scan(&group.Id, &group.Title, &group.Description, &group.TotalMembers, &group.Status)
		if err != nil {
			log.Println(err)
			continue
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func GetGroupIdFromPost(postId int) int {
	groupId := 0
	query := `SELECT group_id FROM card WHERE id = ?`
	db.DB.QueryRow(query).Scan(&groupId)
	return groupId
}

func GetGroupInfo(groupId int, userId int) (models.Groups, error) {
	group := models.Groups{}
	query := `SELECT 
    COALESCE((SELECT status
     FROM group_invitations 
     WHERE group_id = g.id 
	 AND user_id = $1
     LIMIT 1) , '') AS invi,  
    (SELECT EXISTS (
        SELECT 1 FROM group_members 
        WHERE group_id = g.id 
        AND user_id = $1
    )) AS is_member,
    COALESCE(COUNT(DISTINCT gm.user_id), 0) AS total_members  
	FROM groups g
	LEFT JOIN group_members gm ON g.id = gm.group_id 
	WHERE g.id = $2
	`
	err := db.DB.QueryRow(query, userId, groupId).Scan(&group.Status, &group.IsMember, &group.TotalMembers)
	if err != nil {
		return group, err
	}
	return group, nil
}

func CreateEvent(event *models.Event) error {
	query := `INSERT INTO events (title, description, day_time, group_id , creator_id) VALUES (?, ?, ?, ?, ?)`
	res, err := db.DB.Exec(query, event.Title, event.Description, event.StartDate, event.GroupId, event.CreatorId)
	last, _ := res.LastInsertId()
	event.Id = int(last)
	return err
}

func GetEvents(userId, groupId int) ([]models.Event, error) {
	query := `SELECT e.id , e.title , u.nickname ,e.description , e.day_time , e.group_id , e.creator_id ,
	COALESCE((SELECT response FROM event_responses WHERE user_id = ? AND event_id = e.id ) , "") AS status
	FROM events e 
	INNER JOIN users u 
	ON u.id = e.creator_id
	WHERE e.group_id = ? AND e.day_time > CURRENT_TIMESTAMP
	ORDER BY e.day_time`
	row, err := db.DB.Query(query, userId, groupId)
	if err != nil {
		return nil, err
	}
	events := []models.Event{}
	for row.Next() {
		event := models.Event{}
		err = row.Scan(&event.Id, &event.Title, &event.Creator_User, &event.Description, &event.StartDate, &event.GroupId, &event.CreatorId, &event.Status)
		if err != nil {
			continue
		}
		events = append(events, event)
	}
	return events, err
}

func RespoEvent(eventId, userId int, status string) error {
	query := `INSERT INTO event_responses (event_id , user_id , response) VALUES (?, ?, ?)`
	_, err := db.DB.Exec(query, eventId, userId, status)
	return err
}

func GetGroupIdByEventId(eventId int) int {
	groupId := 0
	query := `SELECT group_id FROM events WHERE id = ?`
	db.DB.QueryRow(query, eventId).Scan(&groupId)
	return groupId
}

func CheckUserInEvent(eventId, userId int) bool {
	query := `SELECT EXISTS (SELECT 1 FROM event_responses WHERE event_id = ? AND user_id = ?)`
	var status bool
	db.DB.QueryRow(query, eventId, userId).Scan(&status)
	return status
}

func GetgroupnameById(groupId int) string {
	var groupname string
	query := `SELECT title FROM groups WHERE id = ?`
	db.DB.QueryRow(query, groupId).Scan(&groupname)
	return groupname
}

func AddNotificationGroupEvent(userId, groupid int) error {
	MembersGroup, err := MemberGroup(groupid, userId)
	if err != nil {
		return err
	}
	for _, Member := range MembersGroup {
		query := `INSERT INTO notifications (user_id , sender_id ,group_id,type, details) VALUES (?,?, ?, ?, ?)`
		_, err := db.DB.Exec(query, Member.Id, userId, groupid, "group_event", GetNickName(userId)+" created an event in "+GetgroupnameById(groupid))
		if err != nil {
			log.Println(err)
			continue
		}
		connreciever, ok := models.Clients[Member.Nickname]
		if ok {
			for _, conn := range connreciever.Connections {
				err = conn.WriteJSON(map[string]interface{}{
					"type": "realNotification",
				})
				if err != nil {
					log.Println(err)
					continue
				}
			}
		}
	}
	return nil
}

func ChangeUnreadMessageGroup(msg models.Message, client *models.Client) error {
	query := `UPDATE notifications SET read_status = 'read' WHERE group_id = ? AND user_id = ? AND type = 'messageGroup'`
	_, err := db.DB.Exec(query, msg.Groupid, client.Userid)
	return err
}

func GetGroup_Resuest(group_id int) ([]models.User, error) {
	users := []models.User{}
	query := `SELECT u.nickname , u.avatar_url  FROM users u
	INNER JOIN group_invitations gi ON u.id = gi.user_id
	WHERE gi.group_id = ? AND gi.status = 'pending'
	GROUP BY u.id
	ORDER BY gi.cerated_at DESC
	`
	rows, err := db.DB.Query(query, group_id)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		user := models.User{}
		err = rows.Scan(&user.NickName, &user.AvatarUrl)
		if err != nil {
			continue
		}
		users = append(users, user)
	}
	return users, err
}