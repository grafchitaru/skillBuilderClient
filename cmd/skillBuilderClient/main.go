package main

import (
	"fmt"
	"github.com/grafchitaru/skillBuilderClient/internal/config"
	"github.com/grafchitaru/skillBuilderClient/internal/handlers"
	"github.com/grafchitaru/skillBuilderClient/internal/server"
)

var (
	buildVersion string
	buildDate    string
	buildCommit  string
)

func main() {
	printBuildInfo()
	cfg := *config.NewConfig()
	server.New(handlers.Handlers{Config: cfg})

}

func printBuildInfo() {
	fmt.Println("Build version:", getValueOrDefault(buildVersion, "N/A"))
	fmt.Println("Build date:", getValueOrDefault(buildDate, "N/A"))
	fmt.Println("Build commit:", getValueOrDefault(buildCommit, "N/A"))
}

func getValueOrDefault(value string, defaultValue string) string {
	if value == "" {
		return defaultValue
	}
	return value
}
