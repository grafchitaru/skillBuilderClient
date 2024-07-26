build:
	go build -o skillBuildClient cmd/skillBuilderClient/main.go

run:
	./skillBuildClient

port:
	lsof -i :8081