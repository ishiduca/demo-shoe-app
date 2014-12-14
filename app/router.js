'use strict'
var stream = require('stream')

module.exports = function create () {
    var router = new stream.Writable
    router._write = function (chnk, enc, done) {
        var data
        try {
            data = JSON.parse(chnk)
            this.emit(data.method, data.value)
        } catch (err) {
            this.emit('error', err)
        }
        done()
    }
    return router
}
