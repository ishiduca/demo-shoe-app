'use strict'
var stream = require('stream')
var util   = require('util')
var StringDecoder = require('string_decoder').StringDecoder
var decoder = new StringDecoder('utf8')

function RouterStream () {
    stream.Transform.call(this, {decodeStrings: false})
}
util.inherits(RouterStream, stream.Transform)

RouterStream.prototype._transform = function (chnk, enc, done) {
    if ('buffer' === enc) chnk = decoder.write(chnk)
    var data
    try {
        data = JSON.parse(chnk)
        this.emit(data.method, data.value)
    } catch (err) {
        this.emit('error', err)
    }
    done()
}
RouterStream.prototype.broadcast = function (method, value) {
    try {
        this.push(JSON.stringify({
            method: method
          , value:  value
        }))
    } catch (err) {
        this.emit('error', err)
    }
}

module.exports = function () {
    return new RouterStream
}
