package main

import (
	"fmt"
	"github.com/grafchitaru/skillBuilder/internal/config"
	"github.com/grafchitaru/skillBuilder/internal/handlers"
	"github.com/grafchitaru/skillBuilder/internal/server"
	"log"
	"os/exec"
	"runtime"
)

const (
	version   = "1.0.0"
	buildDate = "2023-10-01"
)

func main() {
	cfg := *config.NewConfig()
	server.New(handlers.Handlers{Config: cfg})

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
