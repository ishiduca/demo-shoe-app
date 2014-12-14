'use strict'
var http = require('http')
var mm = {}
mm.push = function (f) {
    'function' === typeof f && this.middles.push(f)
    return this
}
mm.use = function () {
    var args = [].slice.apply(arguments)
    var name = args.shift()
    if ('function' === typeof name) return this.push(name)
    return this.push(require(name).apply(null, args))
}
mm.constructor = function constructor () {
    var me = this
    this.server = http.createServer(function onRequest (req, res) {
        var cont = {app: me}
        help(0)
        function help (n) {
            if (n > me.middles.length) return
            if ('function' !== typeof me.middles[n]) return help(n + 1)
            me.middles[n].apply(cont, [ req, res, function next () { help(n + 1) }])
        }
    })
    return this
}
module.exports = function create () {
    return Object.create(mm, {
        middles: {value: []}
    }).constructor()
}
