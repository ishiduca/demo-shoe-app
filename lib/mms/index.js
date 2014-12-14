'use strict'
var shoe   = require('shoe')
var routes = require('./router')

var mms = {}
mms.constructor = function () {
    var me = this
    var router = this.router = routes()
    this.sock  = shoe(function (stream) {
        stream.pipe(router).pipe(stream)

        stream.on('close', function () {
            router.emit('close', stream)
        })

        router.emit('connection', stream)
    })
    return this
}
mms.install = function () {
    this.sock.install.apply(this.sock, arguments)
    return this
}
module.exports = function create () {
    return Object.create(mms).constructor()
}
