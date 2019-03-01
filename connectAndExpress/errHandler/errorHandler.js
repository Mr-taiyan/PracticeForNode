let env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
    res.statusCode = 500;

    switch (env) {
        case "development":
            console.error('Error:');
            console.error(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(err));
            break;
        default:
            res.end('server error');
    }
}

module.exports = errorHandler;