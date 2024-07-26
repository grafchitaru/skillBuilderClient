build:
	go build -o skillBuildClient cmd/skillBuilderClient/main.go

run-build:
	./skillBuildClient

port:
	lsof -i :8081

run:
	go run -ldflags "-X main.buildVersion=v1.0.1 -X main.buildDate=v26.07.2024 -X main.buildCommit=test" cmd/skillBuilderClient/main.go
