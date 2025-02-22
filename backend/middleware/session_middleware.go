package middleware

import (
	"context"
	"fmt"
	"net/http"

	repo "social-network/pkg/db/repositories"
)

// AuthMiddleware ensures the user is authenticated via session ID.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session_id")
		if err != nil {
			fmt.Println(err)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		fmt.Println("cookie value:", cookie.Value)
		userId, err := repo.GetUserIdBySession(cookie.Value)
		if err != nil || userId == 0 {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), "userId", userId)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
