package repo

import (
	"database/sql"

	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func AddReaction(reactionRequest *models.ReactionRequest) error {
	existingReaction := getExistingReaction(reactionRequest.UserId, reactionRequest.CardId)
	if existingReaction == reactionRequest.ReactionType {
		return removeReaction(reactionRequest.UserId, reactionRequest.CardId)
	} else {
		return insertReaction(reactionRequest.UserId, reactionRequest.CardId, reactionRequest.ReactionType)
	}
}

func insertReaction(userId, cardId, reactionType int) error {
	query := `
        INSERT INTO likes (user_id, card_id, reaction_type) 
        VALUES (?, ?, ?)
    `
	_, err := db.DB.Exec(query, userId, cardId, reactionType)
	return err
}

func removeReaction(userId, cardId int) error {
	query := `
        DELETE FROM likes 
        WHERE user_id = ? AND card_id = ?
    `
	_, err := db.DB.Exec(query, userId, cardId)
	return err
}

func getExistingReaction(userId, cardId int) int {
	var existingReaction int
	query := `
        SELECT reaction_type 
        FROM likes 
        WHERE user_id = ? AND card_id = ?
    `
	err := db.DB.QueryRow(query, userId, cardId).Scan(&existingReaction)
	if err == sql.ErrNoRows {
		return 0
	}
	return existingReaction
}

func GetReactionCounts(cardId int, userId int) (likes, dislikes int, isLiked bool) {
	query := `
        SELECT 
        SUM(reaction_type = 1) as likes_count,
        SUM(reaction_type = -1) as dislikes_count,
		(SELECT EXISTS (SELECT 1 FROM likes WHERE card_id = $1 AND user_id = $2)) AS isliked
        FROM likes
        WHERE card_id = $1
    `
	err := db.DB.QueryRow(query, cardId, userId).Scan(&likes, &dislikes, &isLiked)
	if err != nil {
		return 0, 0, false
	}
	return likes, dislikes, isLiked
}
