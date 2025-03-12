package services

import (
	"net/http"
	"time"

	"social-network/pkg/auth"
	repo "social-network/pkg/db/repositories"
	"social-network/pkg/models"
)

func RegisterSession(userId int, w http.ResponseWriter) error {
	var session models.Session
	session.UserId = userId
	UUID, err := auth.GenerateSessionID()
	if err != nil {
		return err
	}
	session.UserUUID = UUID
	session.ExpiresAt = time.Now().Add(24 * time.Hour)

	err = repo.CreateSession(&session)
	if err != nil {
		return err
	}

	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    session.UserUUID,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
		MaxAge:   86400, // 1 day
	}
	http.SetCookie(w, cookie)

	return nil
}

func ClearSession(w http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:     "session_id",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
		MaxAge:   -1,
	}
	http.SetCookie(w, cookie)
}

func GetUserIdBySession(cookie string) (int, string, error) {
	return repo.GetUserIdBySession(cookie)
}

func GetSession(userid int) (bool, error) {
	check, err := repo.GetSession(userid)
	return check, err
}
