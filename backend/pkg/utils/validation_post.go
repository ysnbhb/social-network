package utils

import (
	"bytes"
	"errors"
	"fmt"
	"net/url"
	"os"
	"strings"
	"time"

	"social-network/pkg/models"

	"github.com/gofrs/uuid"
)

const maxSize = 10 * 1024 * 1024

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
	fmt.Println(postRequest.GroupId)
	if postRequest.GroupId != 0 && (postRequest.Privacy == "private" || postRequest.Privacy == "almostPrivate") {
		return errors.New("privacy must be 'public' in gourp")
	}

	if _, err := url.ParseRequestURI(postRequest.ImageUrl); err != nil && postRequest.ImageUrl != "" {
		return errors.New("invalid imageUrl format")
	}

	return nil
}

func ValidImg(contentType string, size int64) error {
	if !(len(contentType) > 6 && contentType[:6] == "image/") {
		return fmt.Errorf("Invalid image content type")
	}
	if size > maxSize {
		return fmt.Errorf("data exceeds max allowed size of %d bytes", maxSize)
	}
	return nil
}

func SaveImg(imageB []byte) (string, error) {
	imguuid, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	imgSavingPath := "/uploads/" + imguuid.String() + ".jpg"

	err = os.WriteFile("."+imgSavingPath, imageB, 0o644)
	if err != nil {
		return "", err
	}
	return imgSavingPath, nil
}

// Check if an image is svg type.
func IsSVG(imageB []byte) bool {
	// Remove unnecessary leading characters
	trimmed := bytes.TrimLeft(imageB, " \t\n\r\xef\xbb\xbf")
	if len(trimmed) < 4 {
		return false // Can't be an SVG
	}
	// Case-insensitive comparison
	lower := bytes.ToLower(trimmed)
	return bytes.HasPrefix(lower, []byte("<?xml")) ||
		bytes.Contains(lower, []byte("<svg"))
}

func IsValidTime(timeStr string) bool {
	layout := "2006-01-02T15:04"
	start, err := time.Parse(layout, timeStr)
	if err != nil {
		return false
	}
	fmt.Println(start.Before(time.Now()))
	return !start.Before(time.Now())
}

func ValidEvant(event *models.Event) error {
	if event.Title == "" || event.Description == "" {
		return errors.New("event title or description cannot be empty")
	}
	if len(event.Title) > 50 {
		return errors.New("event title length exceeds 50 characters")
	}
	if len(event.Description) > 500 {
		return errors.New("event description length exceeds 500 characters")
	}
	return nil
}
