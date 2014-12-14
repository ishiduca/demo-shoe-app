#!/usr/bin/env node
'use strict'
var pack     = require('getpack')()
var app_http = require('apps/http')
var port     = process.env.PORT || pack.config.server.port
var mes      = '[server start to listen on port "%s"]'
app_http.server.listen(port, console.log.bind(console, mes, port))

var app_sock = require('apps/sock')
app_sock.install(app_http, pack.config.sock)
