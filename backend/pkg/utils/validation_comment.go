package utils

import (
	"errors"
	"log"
	"social-network/pkg/models"
	"strings"
)

func ValidateComment(commentRequest *models.CommentRequest) error {
	if strings.TrimSpace(commentRequest.Content) == "" {
		return errors.New("comment content cannot be empty")
	}

	if len(commentRequest.Content) > 500 {
		log.Println()
		return errors.New("comment content length exceeds 500 characters")
	}

	return nil
}
