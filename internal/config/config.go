package config

import (
	"flag"
	"fmt"
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"log"
)

type Config struct {
	HTTPServerAddress string `env:"SERVER_ADDRESS" envDefault:"127.0.0.1"`
	HTTPServerPort    string `env:"SERVER_PORT" envDefault:"8081"`
}

type Configs interface {
	NewConfig() *Config
}

func NewConfig() *Config {
	var cfg Config

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	err = env.Parse(&cfg)
	if err != nil {
		fmt.Println("Can't parse  config: %w", err)
	}

	flag.StringVar(&cfg.HTTPServerAddress, "a", cfg.HTTPServerAddress, "HTTP server address")
	flag.StringVar(&cfg.HTTPServerPort, "b", cfg.HTTPServerPort, "HTTP server port")

	flag.Parse()

	return &cfg
}
