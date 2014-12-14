'use strict'
var mm = require('mm')
var app = mm()

app
  .use('favicon')
  .use('static')
  .use('dashboard')
  .use('404')

module.exports = app
