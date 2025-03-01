package controllers

import (
	"log"
	"net/http"
	"strconv"

	"social-network/app/services"
	"social-network/pkg/models"
	"social-network/pkg/utils"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}
	var contant, privacy string
	contant = r.FormValue("content")
	privacy = r.FormValue("postType")
	file, headerFiel, _ := r.FormFile("img")
	var postRequest models.PostRequest
	postRequest.Content = contant
	postRequest.Privacy = privacy
	postRequest.File = file
	postRequest.FileHeader = headerFiel
	// ext := []string{".png", ".gif", ".jpg", ".jpeg"}
	// if !slices.Contains(ext, filepath.Ext(headerFiel.Filename)) {
	// 	utils.JsonResponse(w, "Err Invalid extension", http.StatusBadRequest)
	// 	log.Println(err)
	// 	return
	// }
	postRequest.GroupId, _ = strconv.Atoi("groupId")
	user := r.Context().Value("userId").(int)
	postRequest.UserId = user
	post, err := services.CreatPost(&postRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}
	utils.JsonResponse(w, post, http.StatusCreated)
}
