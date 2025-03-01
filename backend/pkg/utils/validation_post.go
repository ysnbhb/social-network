package utils

import (
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/url"
	"os"
	"strings"

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

	if postRequest.GroupId != 0 && postRequest.Privacy == "private" || postRequest.Privacy == "almostPrivate" {
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

func SaveImg(image multipart.File) (string, error) {
	imguuid, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	imgSavingPath := "/uploads/" + imguuid.String() + ".jpg"
	fileImg, err := os.Create("." + imgSavingPath)
	if err != nil {
		return "", err
	}
	_, err = io.Copy(fileImg, image)
	if err != nil {
		return "", err
	}

	return imgSavingPath, nil
}
