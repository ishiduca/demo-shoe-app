'use strict'
var url   = require('url')
var path  = require('path')
var filed = require('filed')
var pack  = require('getpack')()

module.exports = function () {
    var config = pack.config.static

    return function (req, res, next) {
        var pathname = url.parse(req.url).pathname

        for (var i = 0, len = config.dirs.length; i < len; i++) {
            var dir = config.dirs[i] + '/'
            if (dir === pathname.slice(0, dir.length))
                return filed(path.join(pack.dir, config.root, pathname)).pipe(res)
        }

        next()
    }
}
