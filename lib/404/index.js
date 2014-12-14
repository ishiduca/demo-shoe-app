'use strict'
var http = require('http')
module.exports = function () {
    return function (req, res, next) {
        var mes = ['404', http.STATUS_CODES[404], '-', req.url].join(' ')
        res.writeHead(404, {
            'content-type': 'text/plain; charset=utf-8'
          , 'content-length': Buffer.byteLength(mes)
        })
        res.end(mes)
    }
}
