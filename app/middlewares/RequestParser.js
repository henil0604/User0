const mongo = require("../helpers/mongo");
const resolveRequest = require("../helpers/resolveRequest");
const createResponse = require("../helpers/createResponse");
const responseCode = require("../data/response_code");

module.exports = async (req, res, next) => {

    req.createResponse = createResponse;
    req.resolve = resolveRequest(req, res)
    req.responseCode = responseCode;

    next()
}
