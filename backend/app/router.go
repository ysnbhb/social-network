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

	mux.HandleFunc("/api/user/reactions", controllers.HandleReaction)

	mux.HandleFunc("/api/create/post", controllers.CreatePost)

	mux.HandleFunc("/api/posts/comments", controllers.CreateComments)

	mux.HandleFunc("/api/follow", controllers.HandleFollow)

	mux.HandleFunc("/api/profile/posts/created", controllers.GetCreatedPosts)

	mux.HandleFunc("/api/home/posts", controllers.GetHomePosts)

	return mux
}
