# -*- mode: makefile -*-

COMPOSE = docker-compose


.PHONY: build
build:
	$(COMPOSE) build api front slide


.PHONY: run
run: build
	$(COMPOSE) up -d front slide
	$(COMPOSE) up api
