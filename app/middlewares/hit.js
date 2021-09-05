const log = require('../helpers/log');

module.exports = (req, res, next) => {
    log(`${req.method} ${req.originalUrl}`, "info", undefined);
    next();
}