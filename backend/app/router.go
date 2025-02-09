package app

import (
	"net/http"
	"social-network/app/controllers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/signup", controllers.Signup)

	mux.HandleFunc("/api/user/reactions", controllers.PostReaction)
	mux.HandleFunc("/api/posts", controllers.CreatePost)

	return mux
}
