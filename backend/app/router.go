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

	mux.Handle("/api/user/reactions", middleware.AuthMiddleware(http.HandlerFunc(controllers.HandleReaction)))
	mux.Handle("/api/group/list", middleware.AuthMiddleware(http.HandlerFunc(controllers.ListGroups)))

	mux.Handle("/api/create/post", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreatePost)))
	mux.Handle("/api/posts/comments", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreateComments)))
	mux.Handle("/api/follow", middleware.AuthMiddleware(http.HandlerFunc(controllers.HandleFollow)))
	mux.Handle("/api/profile/posts/created", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetCreatedPosts)))
	mux.Handle("/api/profile", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetInfoUserProfile)))

	mux.Handle("/api/home/posts", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetHomePosts)))

	mux.Handle("/ws", middleware.AuthMiddleware(http.HandlerFunc(controllers.HandleWebsocket)))
	mux.Handle("/api/friends", middleware.AuthMiddleware(http.HandlerFunc(controllers.Friends)))
	mux.Handle("/uploads/", middleware.AuthMiddleware(http.HandlerFunc(controllers.ServeContent)))
	return mux
}
