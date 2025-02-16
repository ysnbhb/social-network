package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func JsoneResponse(w http.ResponseWriter, message any, code int) {
	w.WriteHeader(code)
	w.Header().Set("Content-Type", "application/json")
	decoding := json.NewEncoder(w)
	err := decoding.Encode(message)
	if err != nil {
		log.Println(err)
		return
	}
}
