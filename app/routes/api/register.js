const validationSchema = require("../../helpers/validationSchema");
const User = require("../../Models/User")
const initRole = require("../../helpers/role/init");
const createUser = require("../../helpers/user/create");
const getUser = require("../../helpers/user/get");

module.exports = async (req, res) => {
    try {

        // Adding UserIp into data
        req.body.createdBy = req.clientIp;

        // Validating Data
        let data = await validationSchema.Register.validateAsync(req.body);

        // Initializing Role and Permissions
        await initRole()

        if (await getUser({ username: data.username })) {
            throw {
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "\"username\" is taken"
                }
            }
        }

        if (await getUser({ email: data.email })) {
            throw {
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "\"email\" is already Registered"
                }
            }
        }

        const newUser = await createUser(data);

        throw {
            statusCode: 201,
            status: "success",
            code: req.responseCode.CREATED,
            data: {
                username: newUser.username,
                email: newUser.email,
                createdBy: newUser.createdBy,
                status: newUser.status,
                verifiedBy: newUser.verifiedBy,
                roles: newUser.roles,
                userId: newUser.userId,
                createdAt: newUser.createdAt,
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