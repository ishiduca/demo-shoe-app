'use strict'
var fs = require('fs')
var path = require('path')
module.exports = function () {
    return get(process.argv[1] || process.cwd())

    function get (cwd) {
        var packagejson = path.join(cwd, 'package.json')
        if (fs.existsSync(packagejson)) {
            var pack  = require(packagejson)
            pack.dir = cwd
            pack.resolve = function () {
                var args = [].slice.apply(arguments)
                return path.join.apply(path, [cwd].concat(args))
            }
            return pack
        }

        if (-1 === cwd.indexOf(process.env.HOME))
            return null

        return get(path.join(cwd, '..'))
    }
}
