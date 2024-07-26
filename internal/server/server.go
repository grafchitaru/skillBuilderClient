package server

import (
	"fmt"
	"github.com/grafchitaru/skillBuilderClient/internal/handlers"
	"log"
	"net/http"
)

func New(ctx handlers.Handlers) {
	hc := &handlers.Handlers{
		Config: ctx.Config,
	}

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	http.HandleFunc("/version", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Version: %s\nBuild Date: %s", version, buildDate)
	})

	go openBrowser("http://127.0.0.1:8081/")

	log.Println("Starting server on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))

	err := http.ListenAndServe(ctx.Config.HTTPServerAddress, r)
	if err != nil {
		fmt.Println("Error server: %w", err)
	}
}
