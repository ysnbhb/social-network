package controllers

import (
	"errors"
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
	if file != nil {
		postRequest.ImgContant, err = utils.LimitRead(file, 3*1024*1024)
		if err != nil {
			utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = utils.ValidImg(headerFiel.Header.Get("Content-Type"), headerFiel.Size)
		if err != nil {
			utils.JsonResponse(w, errors.New("validating image: "+err.Error()), http.StatusBadRequest)
			return
		}
		if utils.IsSVG(postRequest.ImgContant) {
			utils.JsonResponse(w, "img is svg", http.StatusBadRequest)
			return
		}
	}
	postRequest.GroupId, _ = strconv.Atoi(r.FormValue("groupId"))
	
	user := r.Context().Value("userId").(int)
	postRequest.UserId = user
	post, err := services.CreatPost(&postRequest)
	if err != nil {
		utils.JsonResponse(w, err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}
	log.Println("postRequestpostRequestpostRequestpostRequestpostRequestpostRequestpostRequestpostRequestpostRequest", postRequest)
	utils.JsonResponse(w, post, http.StatusCreated)
}
