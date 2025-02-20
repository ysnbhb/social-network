package utils

import (
	"errors"
	"net/url"
	"strings"

	"social-network/pkg/models"
)

func ValidatePost(postRequest *models.PostRequest) error {
	if strings.TrimSpace(postRequest.Content) == "" {
		return errors.New("post content cannot be empty")
	}

	if len(postRequest.Content) > 2200 {
		return errors.New("post content length exceeds 2200 characters")
	}

	if postRequest.Privacy != "public" && postRequest.Privacy != "private" && postRequest.Privacy != "almostPrivate" {
		return errors.New("privacy must be 'public', 'private', or 'almostPrivate'")
	}

	if postRequest.GroupId != 0 && postRequest.Privacy == "private" || postRequest.Privacy == "almostPrivate" {
		return errors.New("privacy must be 'public' in gourp")
	}

	if _, err := url.ParseRequestURI(postRequest.ImageUrl); err != nil && postRequest.ImageUrl != "" {
		return errors.New("invalid imageUrl format")
	}

	return nil
}
