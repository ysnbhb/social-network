run:
	@chmod +x run.sh
	@./run.sh

docker:
	@docker-compose up --build
