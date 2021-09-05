const log = require("./log");

module.exports = (req, res) => {
    return (data = {}, statusCode, json = true) => {
        try {
            const status = statusCode || data.statusCode || 200
            res.status(status);
            res[json == true ? "json" : "send"](data || {})
            log(`RESPONSE SENT: ${status}`)
            return true;
        } catch (e) {
            log(`${e.message}`, "error")
            return false
        }
    }
}