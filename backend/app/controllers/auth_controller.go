package controllers //auth_controller.go

import (
	"encoding/json"
	"fmt"
	"net/http"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

// Login handles user login.
func Login() {
	// check user is in database && Set the session ID in a cookie.
}

func Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Println("method not allowed in signup")
		return
	}
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		fmt.Println("error decoding json signup", err.Error())
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

	err = services.RegisterUser(user)
	if err != nil {
		fmt.Println("adding user to db:", err)
		return
	}
	fmt.Println(user)
	// insert to data base

}
