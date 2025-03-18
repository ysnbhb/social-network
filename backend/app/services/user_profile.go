package services

import (
	"log"

	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func GetPostsUserProfile(username string, userid, offset int) []models.PostsResponse {
	var postsResponse []models.PostsResponse
	err := repo.GetCreatedUserPosts(&postsResponse, userid, username, offset)
	if err != nil {
		log.Println("Get Created Posts:", err)
		return nil
	}
	return postsResponse
}

func UserProfile(username string, userId int) (models.UserProfile, error) {
	profile := &models.UserProfile{}
	err := repo.InfoUserProfile(profile, username, userId)
	if err != nil {
		log.Println("Error To Get User Profile", err)
		return models.UserProfile{}, err
	}
	profile.IsFollowing = repo.GetIsFollowing(userId, profile.Id)
	return *profile, nil
}

func GetUserFollowing(current_username string, my_userid int) ([]models.UnfollowUser, error) {
	current_userId := repo.GetUserIdByNickName(current_username)
	return repo.GetUserFollowing(current_userId, my_userid)
}

func GetUserFollower(current_username string, my_userid int) ([]models.UnfollowUser, error) {
	current_userId := repo.GetUserIdByNickName(current_username)
	return repo.GetUserFollower(current_userId, my_userid)
}
