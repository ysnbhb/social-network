package app

import (
	"net/http"

	"social-network/app/controllers"
	"social-network/pkg/handlers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/signup", controllers.Signup)
	mux.HandleFunc("/api/login", controllers.Login)



	mux.HandleFunc("/api/postReaction", handlers.HandlePostReaction)
	// mux.Handle("/api/home", middleware.AuthMiddleware(http.HandlerFunc(controllers.Home)))

	return mux
}
