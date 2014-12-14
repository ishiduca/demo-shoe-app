'use strict'
var app = require('mms')()

app.router.on('connection', function (stream) {
    console.log('[connection %s]', stream.constructor.name)
    this.broadcast('signin', {
        count: count(this._readableState.pipes)
    })
})
app.router.on('close', function (stream) {
    console.log('[close %s]', stream.constructor.name)
    this.broadcast('signout', {
        count: count(this._readableState.pipes)
    })
})
app.router.on('error', function (err) {
    console.log(err)
})
app.router.on('post', function (data) {
    console.log(data)
    data.now = Date.now()
    this.broadcast('post', data)
})


var install = app.install
app.install = function (_app, opt) {
    install.call(this, _app.server, opt)
}

module.exports = app

function count (pipes) {
    return null === pipes       ? 0 :
           Array.isArray(pipes) ? pipes.length : 1
}
