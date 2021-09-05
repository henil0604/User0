const rateLimit = require("express-rate-limit");

module.exports = (data) => {
    return rateLimit(data);
}