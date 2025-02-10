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
		log.Println("method not allowed in login")
		return
	}
	var login models.Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		log.Println("error decoding json lgoin")
		return
	}
	err = services.LoginUser(&login)
	if err != nil {
		log.Println(err)
		return
	}

	err = services.RegisterSession(login.Id, w)
	if err != nil {
		log.Println("adding session:", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
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
		// utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
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
		// utils.JsoneResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding session:", err)
		return
	}

	utils.JsoneResponse(w, "User log in successfully", http.StatusCreated)
	// json.NewEncoder(w).Encode(map[string]string{"message": "User log in successfully"})
}
