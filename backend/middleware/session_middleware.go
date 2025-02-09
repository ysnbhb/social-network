package middleware

// import (
// 	"context"
// 	"net/http"
// 	"social-network/app/services"
// 	"social-network/pkg/auth"
// )

// // AuthMiddleware ensures the user is authenticated via session ID.
// func AuthMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		cookie, err := r.Cookie("session_id")
// 		if err != nil || !auth.ValidateUUID(cookie.Value) {
// 			http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 			return
// 		}

// 		user, err := services.GetUserBySessionID(cookie.Value)
// 		if err != nil || user == nil {
// 			http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }
