package utils

import (
	"errors"
	"net/url"
	"social-network/pkg/models"
)

func ValidatePost(postRequest *models.PostRequest) error {
	if len(postRequest.Content) > 2200 {
		return errors.New("content length exceeds 2200 characters")
	}

	if postRequest.Privacy != "public" && postRequest.Privacy != "private" && postRequest.Privacy != "almostPrivate" {
		return errors.New("privacy must be 'public', 'private', or 'almostPrivate'")
	}

	if _, err := url.ParseRequestURI(postRequest.ImageUrl); err != nil {
		return errors.New("invalid imageUrl format")
	}

	return nil
}
