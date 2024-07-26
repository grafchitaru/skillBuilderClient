package server

import (
	"fmt"
	"github.com/grafchitaru/skillBuilderClient/internal/handlers"
	"log"
	"net/http"
	"os/exec"
	"runtime"
)

func New(ctx handlers.Handlers) {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})
	go openBrowser("http://" + ctx.Config.HTTPServerAddress + ":" + ctx.Config.HTTPServerPort + "/")

	fmt.Println("Starting server on :" + ctx.Config.HTTPServerPort)
	fmt.Println(http.ListenAndServe(":"+ctx.Config.HTTPServerPort, nil))
}

func openBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Run()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Run()
	case "darwin":
		err = exec.Command("open", url).Run()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}
