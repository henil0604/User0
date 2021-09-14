const env = require("../helpers/env");
const JWT = require("../helpers/JWT");
const getUser = require("../helpers/user/get");

module.exports = async (req, res, next) => {
    try {

        const accessTokenCookieName = env("ACCESS_TOKEN_COOKIE_NAME") || "at_"

        const accessToken = req.body.accessToken || req.cookies[accessTokenCookieName];

        const $user = JWT.verify.accessToken(accessToken)

        const isExpress = typeof next == "function";

        req.$user = null;
        if (!$user) {
            if (isExpress) {
                try {
                    req.resolve(req.createResponse({
                        status: "error",
                        code: req.responseCode.UNAUTHORIZED,
                        statusCode: 401,
                        data: {
                            accessToken
                        }
                    }))
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        }

        if (isExpress) {
            req.$user = await getUser({ userId: $user.userId })
            next()
        } else {
            return $user;
        }


    } catch (e) {
        return false
    }

}