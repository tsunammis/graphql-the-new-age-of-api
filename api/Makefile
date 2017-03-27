# -*- mode: makefile -*-

BABELCLI = ./node_modules/.bin/babel
NODEMON = ./node_modules/.bin/nodemon

.PHONY: build
build:
	$(BABELCLI) src --out-dir ./dist

.PHONY: local-watch
local-watch:
	$(BABELCLI) src --watch --out-dir ./dist & ${NODEMON} dist/index.js

.PHONY: local-run
local-run: local-watch
