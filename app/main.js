'use strict'
var router  = require('./router')()
var shoe    = require('shoe')
var handlb  = require('handlebars')
var temps   = {
    results: require('./view/results.hbs')
  , meta:    require('./view/meta.hbs')
}

var stream  = shoe('/chat')
;(function () {
    var write = stream.write
    stream.write = function (method, data) {
        write.call(this, JSON.stringify({
            method: method
          , value: data
        }))
    }
})()

var mess = {messages: []}

stream.on('connect', function () {
    console.log('[open socket]')
})
stream.on('error', function (err) {
    console.log(err)
})

stream.pipe(router)

router.on('post', function (value) {
     value.now = (new Date(value.now)).toUTCString()
     mess.messages.unshift(value)
     document.querySelector('#results').innerHTML = temps.results(mess)
})
router.on('signin', function (value) {
	document.querySelector('#meta').innerHTML = temps.meta(value)
})
router.on('signout', function (value) {
	document.querySelector('#meta').innerHTML = temps.meta(value)
})

document.querySelector('#f').onsubmit = function (ev) {
    var name = document.querySelector('#name')
    var mes  = document.querySelector('#message')
    var data = {
        name:    name.value
      , message: mes.value
    }

    if (! data.message) return console.log('message empty')

    stream.write('post', data)
    mes.value  = ''
    mes.focus()
}

document.querySelector('#name').focus()
