package app

import (
	"net/http"

	"social-network/app/controllers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/signup", controllers.Signup)
	mux.HandleFunc("/api/login", controllers.Login)
	mux.HandleFunc("/api/logout", controllers.Logout)



	mux.HandleFunc("/api/user/reactions", controllers.AddReaction)

	mux.HandleFunc("/api/posts", controllers.CreatePost)

	mux.HandleFunc("/api/posts/comments", controllers.CreateComments)

	return mux
}
