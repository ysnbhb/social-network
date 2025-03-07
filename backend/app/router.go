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
	mux.Handle("/api/group/joinlist", middleware.AuthMiddleware(http.HandlerFunc(controllers.ListGroups)))
	mux.Handle("/api/group/unjoinedgroups", middleware.AuthMiddleware(http.HandlerFunc(controllers.ListUnJoinGroups)))
	mux.Handle("/api/group/invitations", middleware.AuthMiddleware(http.HandlerFunc(controllers.ListInviGroups)))
	mux.Handle("/api/group/create", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreateGroup)))
	mux.Handle("/api/group/join", middleware.AuthMiddleware(http.HandlerFunc(controllers.JoinToGroup)))
	mux.Handle("/api/group/accepjoin", middleware.AuthMiddleware(http.HandlerFunc(controllers.AcceptJoin)))
	mux.Handle("/api/group/posts", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetGroupPost)))
	mux.Handle("/api/group/groupInfo", middleware.AuthMiddleware(http.HandlerFunc(controllers.GroupInfo)))
	mux.Handle("/api/group/create/event", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreateEvent)))
	mux.Handle("/api/group/events", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetEvents)))
	mux.Handle("/api/group/event/response", middleware.AuthMiddleware(http.HandlerFunc(controllers.RespoEvent)))
	mux.Handle("/api/group/chat", middleware.AuthMiddleware(http.HandlerFunc(controllers.GroupChat)))
	mux.Handle("/api/group/members", middleware.AuthMiddleware(http.HandlerFunc(controllers.Groupmembers)))

	mux.Handle("/api/create/post", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreatePost)))
	mux.Handle("/api/posts/comments", middleware.AuthMiddleware(http.HandlerFunc(controllers.CreateComments)))
	mux.Handle("/api/follow", middleware.AuthMiddleware(http.HandlerFunc(controllers.HandleFollow)))
	mux.Handle("/api/unfollow", middleware.AuthMiddleware(http.HandlerFunc(controllers.ShowUnfollowUser)))
	mux.Handle("/api/profile/posts/created", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetCreatedPosts)))
	mux.Handle("/api/profile", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetInfoUserProfile)))

	mux.Handle("/api/home/posts", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetHomePosts)))

	mux.Handle("/ws", middleware.AuthMiddleware(http.HandlerFunc(controllers.HandleWebsocket)))
	mux.Handle("/api/friends", middleware.AuthMiddleware(http.HandlerFunc(controllers.Friends)))
	mux.Handle("/uploads/", middleware.AuthMiddleware(http.HandlerFunc(controllers.ServeContent)))
	mux.Handle("/api/notifications", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetNotification)))
	mux.Handle("/api/user/info", middleware.AuthMiddleware(http.HandlerFunc(controllers.GetuserinfoByname)))
	mux.Handle("/api/user/checklogin", middleware.AuthMiddleware(http.HandlerFunc(controllers.CheckLogin)))

	return mux
}
