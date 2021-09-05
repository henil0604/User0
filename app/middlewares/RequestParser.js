const mongo = require("../helpers/mongo");
const resolveRequest = require("../helpers/resolveRequest");
const createResponse = require("../helpers/createResponse");

module.exports = async (req, res, next) => {

    req.createResponse = createResponse;
    req.resolve = resolveRequest(req, res)

    next()
}
