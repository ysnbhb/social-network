package middleware

import (
	"context"
	"net/http"

	"social-network/app/services"
)

type infoUser struct {
	userid   int
	username string
}

// AuthMiddleware ensures the user is authenticated via session ID.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var cookie string
		if r.Header.Get("Connection") == "Upgrade" {
			cookie = r.URL.Query().Get("session_id")
		} else {
			cookies, err := r.Cookie("session_id")
			if err != nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				http.Redirect(w, r, "/login", http.StatusSeeOther)
				return
			}
			cookie = cookies.Value
		}
		userId, username, err := services.GetUserIdBySession(cookie)
		if err != nil || userId == 0 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), "userId", userId)
		ctx = context.WithValue(ctx, "username", username)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
