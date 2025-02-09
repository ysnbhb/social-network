package middleware

import (
	"net/http"
	repo "social-network/pkg/db/repositories"
)

// AuthMiddleware ensures the user is authenticated via session ID.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session_id")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		user, err := repo.GetUserIdBySession(cookie.Value)
		if err != nil || user == 0 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
