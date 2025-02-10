package logexplore

import (
	"io"
	"log"
	"os"
)

func LogFile() {
	logFile, err := os.OpenFile("file.log", os.O_CREATE|os.O_RDWR|os.O_APPEND, 0o644)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	multiWriter := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(multiWriter)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
}
