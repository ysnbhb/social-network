package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func JsonResponse(w http.ResponseWriter, message any, code int) {
	w.WriteHeader(code)
	decoding := json.NewEncoder(w)
	err := decoding.Encode(message)
	if err != nil {
		log.Println(err)
		return
	}
}
