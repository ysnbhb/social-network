package repo

import (
	db "social-network/pkg/db/sqlite"
	"social-network/pkg/models"
)

func CreatPost(postRequest *models.PostRequest) error {
	cardId, err := CreateCard(postRequest.UserId, postRequest.GroupId , postRequest.Content, postRequest.ImageUrl)
	if err != nil {
		return err
	}

	query := `INSERT INTO posts(card_id, privacy) VALUES(?, ?);`
	_, err = db.DB.Exec(query, cardId, postRequest.Privacy)
	return err
	
}
