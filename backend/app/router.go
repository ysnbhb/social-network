package app

import (
	"net/http"

	"social-network/app/controllers"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/signup", controllers.Signup)

	// mux.Handle("/api/home", middleware.AuthMiddleware(http.HandlerFunc(controllers.Home)))

	return mux
}
