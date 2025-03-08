package controllers

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"social-network/pkg/utils"
)

func ServeContent(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
		log.Println("method not allowed")
		return
	}
	if strings.Contains(r.URL.Path, "..") {
		utils.JsonResponse(w, "page not found", http.StatusNotFound)
		return
	}
	file, err := os.ReadFile("." + r.URL.Path)
	if err != nil {
		utils.JsonResponse(w, "page not found", http.StatusNotFound)
	 
		return
	}
	http.ServeContent(w, r, "."+r.URL.Path, time.Now(), strings.NewReader(string(file)))
}
