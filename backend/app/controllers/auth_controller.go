package controllers // auth_controller.go

import (
	"encoding/json"
	"fmt"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

// Login handles user login.
func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed in login")
		return
	}
	var login models.Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		fmt.Println("error decoding json lgoin")
		return
	}
	err = services.LoginUser(&login)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = services.RegisterSession(login.Id, w)
	if err != nil {
		fmt.Println("adding session:", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User logged in successfully"})
}

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed in signup")
		return
	}
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		fmt.Println("error decoding json signup")
		return
	}
	err = utils.ValidateUser(&user)
	if err != nil {
		fmt.Println(err)
		return
	}

	err = utils.HashPassword(&user)
	if err != nil {
		fmt.Println("hashing password:", err)
		return
	}

	err = services.RegisterUser(&user)
	if err != nil {
		fmt.Println("adding user to db:", err)
		return
	}

	// Registring session front (cookies) and backend (database)
	err = services.RegisterSession(user.Id, w)
	if err != nil {
		fmt.Println("adding session:", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User signUp successfully"})
}

func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed in login")
		return
	}
	userId := r.Context().Value("userId").(int)
	err := services.LogoutUser(userId)
	if err != nil {
		fmt.Println("error in logout user")
		return
	}

	services.ClearSession(w)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "user loged out successful"})
}
