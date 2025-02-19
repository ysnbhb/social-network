package utils

import (
	"errors"
	"strings"

	"social-network/pkg/models"
)

func ValidateGroup(gp models.Groups) error {
	if strings.TrimSpace(gp.Title) == "" || strings.TrimSpace(gp.Description) == "" {
		return errors.New("title or description are emtey")
	}
	if len(gp.Title) > 50 {
		return errors.New("title has be less than 50")
	}
	if len(gp.Description) > 100 {
		return errors.New("description has be less than 100")
	}
	return nil
}
