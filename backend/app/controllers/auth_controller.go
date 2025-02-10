package controllers // auth_controller.go

import (
	"encoding/json"
	"log"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

// Login handles user login.
func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "method not allowed in login", http.StatusMethodNotAllowed)
		log.Println("method not allowed in login")
		return
	}
	var login models.Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		utils.JsoneResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("error decoding json lgoin")
		return
	}
	err = services.LoginUser(&login)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	err = services.RegisterSession(login.Id, w)
	if err != nil {
		utils.JsoneResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("adding session:", err)
		return
	}

	utils.JsoneResponse(w, "User logged in successfully", http.StatusBadRequest)
}

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "Status Method Not Allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed in signup")
		return
	}
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		utils.JsoneResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("error decoding json signup")
		return
	}
	err = utils.ValidateUser(&user)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	err = utils.HashPassword(&user)
	if err != nil {
		utils.JsoneResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("hashing password:", err)
		return
	}

	err = services.RegisterUser(&user)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding user to db:", err)
		return
	}

	// Registring session front (cookies) and backend (database)
	err = services.RegisterSession(user.Id, w)
	if err != nil {
		utils.JsoneResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("adding session:", err)
		return
	}
	utils.JsoneResponse(w, "User signUp successfully", http.StatusBadRequest)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsoneResponse(w, "method not allowed in login", http.StatusMethodNotAllowed)
		log.Println("method not allowed in login")
		return
	}
	userId := r.Context().Value("userId").(int)
	err := services.LogoutUser(userId)
	if err != nil {
		utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error in logout user")
		return
	}

	services.ClearSession(w)
	utils.JsoneResponse(w, "user loged out successful", http.StatusBadRequest)
}
