package services

import (
	"errors"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetHomePosts(postsResponse *[]models.PostsResponse, userId int, offset int) error {
	err := repo.GetHomePosts(postsResponse, userId, offset)
	if err != nil {
		return errors.New("Error getting posts")
	}
	return nil
}
