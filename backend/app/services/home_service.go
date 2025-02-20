package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetHomePosts(postsResponse *[]models.PostsResponse, userId int) error {
	err := repo.GetHomePosts(postsResponse , userId)
	if err != nil {
		return errors.New("Error getting posts")
	}
	return nil
}
