package services

import (
	"log"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetPostsUserProfile(username string, offset int) []models.PostsResponse {
	var postsResponse []models.PostsResponse
	err := repo.GetCreatedUserPosts(&postsResponse, username, offset)
	if err != nil {
		log.Println("Get Created Posts:", err)
		return nil
	}
	return postsResponse
}

func UserProfile(username string) (models.UserProfile, error) {
	profile := &models.UserProfile{}
	err := repo.InfoUserProfile(profile, username)
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
