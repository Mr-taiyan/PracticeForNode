const connect = require('connect');
const errorHandler = require('./errHandler/errorHandler.js');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
    ceshi();
    next();
}

connect()
    .use(logger)
    .use(hello)
    .use(errorHandler)
    .listen(3000);
