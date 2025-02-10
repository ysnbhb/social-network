package app

import (
	"net/http"

	"social-network/app/controllers"
	"social-network/middleware"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/signup", controllers.Signup)
	mux.HandleFunc("/api/login", controllers.Login)
	mux.Handle("/api/logout", middleware.AuthMiddleware(http.HandlerFunc(controllers.Logout)))

	mux.HandleFunc("/api/user/reactions", controllers.AddReaction)

	mux.HandleFunc("/api/posts", controllers.CreatePost)

	mux.HandleFunc("/api/posts/comments", controllers.CreateComments)

	return mux
}
