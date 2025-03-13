package controllers // auth_controller.go

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

// Login handles user login.
func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "method not allowed in login", http.StatusMethodNotAllowed)
		log.Println("method not allowed in login")
		return
	}
	var login models.Login
	var username string
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		utils.JsonResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusBadRequest)
		log.Println("error decoding json lgoin")
		return
	}
	username, err = services.LoginUser(&login)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}
	log.Println(username)
	err = services.RegisterSession(login.Id, w)
	if err != nil {
		utils.JsonResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("adding session:", err)
		return
	}
	// postsResponse, err := services.UserProfile(username)
	// if err != nil {
	// 	utils.JsonResponse(w, "Status Not Found", http.StatusNotFound)
	// 	log.Println("Status Not Found this User ID", err)
	// 	return
	// }
	err = json.NewEncoder(w).Encode("successful Login")
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusInternalServerError)
		log.Println("error encoding json reactionResponse:", err)
		return
	}
}

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "Status Method Not Allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed in signup")
		return
	}
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	var user models.User
	user.Email = r.FormValue("email")
	user.Password = r.FormValue("password")
	user.FirstName = r.FormValue("firstName")
	user.LastName = r.FormValue("lastName")
	user.DateOfBirth = r.FormValue("dateOfBirth")
	user.NickName = r.FormValue("nickName")
	user.AboutMe = r.FormValue("aboutMe")
	user.Profile_Type = r.FormValue("profile_type")
	user.CreatedAt = time.Now()
	file, headerFiel, _ := r.FormFile("img")
	if file != nil {
		user.ImgContant, err = utils.LimitRead(file, 1*1024*1024)
		if err != nil {
			utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = utils.ValidImg(headerFiel.Header.Get("Content-Type"), headerFiel.Size)
		if err != nil {
			utils.JsonResponse(w, errors.New("validating image: "+err.Error()), http.StatusBadRequest)
			return
		}
		if utils.IsSVG(user.ImgContant) {
			utils.JsonResponse(w, "img is svg", http.StatusBadRequest)
			return
		}
	}
	err = utils.ValidateUser(&user)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	err = utils.HashPassword(&user)
	if err != nil {
		utils.JsonResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("hashing password:", err)
		return
	}

	err = services.RegisterUser(&user)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("adding user to db:", err)
		return
	}

	// Registring session front (cookies) and backend (database)
	err = services.RegisterSession(user.Id, w)
	if err != nil {
		utils.JsonResponse(w, "UnThe server was unable to complete your request. Please try again later.", http.StatusInternalServerError)
		log.Println("adding session:", err)
		return
	}
	utils.JsonResponse(w, "User signUp successfully", http.StatusCreated)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "method not allowed in login", http.StatusMethodNotAllowed)
		log.Println("method not allowed in login")
		return
	}
	userId := r.Context().Value("userId").(int)
	err := services.LogoutUser(userId)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println("error in logout user")
		return
	}
	services.ClearSession(w)
	utils.JsonResponse(w, "user loged out successful", http.StatusBadRequest)
}

func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.JsonResponse(w, "Status Method Not Allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed in update profile")
		return
	}

	userId := r.Context().Value("userId").(int)
	var users models.User

	err := json.NewDecoder(r.Body).Decode(&users)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}
	users.Id = userId
	// if users.Profile_Type != "private" && users.Profile_Type != "public" {
	// 	users.Profile_Type = "public"
	// }
	err = services.UpdateProfile(&users)
	if err != nil {
		utils.JsonResponse(w, "field to update profile", http.StatusBadRequest)
		log.Println("error in update profile")
		return
	}
	newUser, err := services.UserProfile(users.NickName, userId)
	utils.JsonResponse(w, newUser, http.StatusOK)
}

func Session_id(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userId").(int)
	log.Println(userID)
}

func CheckLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CheckLogin")
}
