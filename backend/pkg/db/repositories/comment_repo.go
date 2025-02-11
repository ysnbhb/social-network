package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func AddComment(commentRequest *models.CommentRequest) error {
	cardId, err := CreateCard(commentRequest.UserId, 0, commentRequest.Content, "")
	if err != nil {
		return err
	}

	query := `INSERT INTO comments(card_id, target_id) VALUES(?, ?); `
	_, err = db.DB.Exec(query, cardId, commentRequest.TargetId)
	return err
}
