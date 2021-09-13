const validationSchema = require("../../helpers/validationSchema");
const User = require("../../Models/User")
const getUser = require("../../helpers/user/get");
const bcrypt = require("bcrypt");
const JWT = require("../../helpers/JWT")
const updateUser = require("../../helpers/user/update");

module.exports = async (req, res) => {
    try {

        if (!req.body.method) {
            req.body.method = "regular"
        }

        if (req.body.method == "regular" && !req.body.password) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "\"password\" is required"
                }
            }
        } else if (req.body.method != "regular" && !req.body.authId) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "\"authId\" is required"
                }
            }
        }

        // Validating Data
        let data = await validationSchema.Login.validateAsync(req.body);

        let $user = await getUser({
            email: data.email
        })

        if (!$user) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "User not found"
                }
            }
        }

        if ($user.method != req.body.method) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "Invalid Login Method"
                }
            }
        }

        let authAccessMatch = false;
        if (req.body.method == "regular") {
            authAccessMatch = await bcrypt.compare(req.body.password, $user.password);
        } else {
            authAccessMatch = await bcrypt.compare(req.body.authId, $user.authId);
        }

        if (!authAccessMatch) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: `Invalid Username/${req.body.method == "regular" ? "Password" : "AuthId"}`
                }
            }
        }

        $user = await $user.update((user) => {
            if (user.status == "offline") {
                user.status = "online";
            }
            return user;
        })

        const JWTData = {
            username: $user.username,
            email: $user.email,
            status: $user.status,
            verifiedBy: $user.verifiedBy,
            roles: $user.roles,
            method: $user.method,
            userId: $user.userId,
            createdAt: $user.createdAt,
        }

        const tokens = {
            accessToken: JWT.generate.accessToken({
                ...JWTData,
                origin: "accessToken"
            }),
            refreshToken: JWT.generate.refreshToken({
                ...JWTData,
                origin: "refreshToken"
            }),
        }

        if (!tokens.accessToken || !tokens.refreshToken) {
            throw {
                error: {
                    message: "Failed to generate accessToken/refreshToken"
                }
            }
        }

        throw {
            status: "success",
            statusCode: 201,
            code: req.responseCode.LOGGED_IN,
            data: {
                ...tokens
            }
        }

    } catch (d) {
        // preparing data
        let data = {
            status: "error",
            statusCode: 500,
            code: req.responseCode.INTERNAL_SERVER_ERROR,
        }

        // checking if data is instance of "Error"
        if (d instanceof Error) {
            // Injecting `code` as internal server error
            data.code = req.responseCode.INTERNAL_SERVER_ERROR;
            data.error = {};
            data.error.message = "Something went wrong";
            data.error.stack = d.stack
            if (d.isJoi) {
                data.code = req.responseCode.VALIDATION_ERROR
                data.error.message = d.message;
            }
        } else {
            // else just add `d` object to `data`
            data = {
                ...data,
                ...d
            }

        }
        // sending data
        req.resolve(req.createResponse(data))
    }

}