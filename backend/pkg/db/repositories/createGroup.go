package repo

import (
	"strings"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreateGroup(gp models.Groups) error {
	query := `INSERT INTO groups(title  , description  , creator_id) VALUES (? , ? , ?)`
	_, err := db.DB.Exec(query, strings.TrimSpace(gp.Title), strings.TrimSpace(gp.Description), gp.Owner)
	return err
}
