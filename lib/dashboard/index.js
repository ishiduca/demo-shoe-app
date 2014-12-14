'use strict'
var fs   = require('fs')
var path = require('path')
var url  = require('url')
var handleb = require('handlebars')
var pack    = require('getpack')()

module.exports = function (req, res) {
    var index_html = fs.readFileSync(path.join(__dirname, '../../view/index.html'), 'utf8')
    var template   = handleb.compile(index_html)
    var config     = pack.config.app.dashboard
    config.title = pack.name + ' v' + pack.version

    return function (req, res, next) {
        if (url.parse(req.url).pathname !== '/') return next()

        var dashboard = template(config)

        res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8'
          , 'content-length': Buffer.byteLength(dashboard)
        })
        res.end(dashboard)
    }
}
