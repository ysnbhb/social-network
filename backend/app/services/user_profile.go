package services

import (
	"log"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetPostsUserProfile(user_id, offset int) []models.PostsResponse {
	var postsResponse []models.PostsResponse
	err := repo.GetCreatedUserPosts(&postsResponse, user_id, offset)
	if err != nil {
		log.Println("Get Created Posts:", err)
		return nil
	}
	return postsResponse
}

func UserProfile(user_id int) (models.UserProfile, error) {
	profile := &models.UserProfile{}
	err := repo.InfoUserProfile(profile, user_id)
	if err != nil {
		log.Println("Error To Get User Profile", err)
		return models.UserProfile{}, err
	}
	return *profile, nil
}

func GetUserFollowing(user int) ([]models.UnfollowUser, error) {
	return repo.GetUserFollowing(user)
}

func GetUserFollower(user int) ([]models.UnfollowUser, error) {
	return repo.GetUserFollower(user)
}
