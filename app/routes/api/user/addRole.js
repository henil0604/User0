const getRole = require("../../../helpers/role/get");


module.exports = async (req, res) => {

    try {

        if (!req.body.role) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: "\"role\" is required"
                }
            };
        }

        if (!(await getRole({ name: req.body.role }))) {
            throw {
                status: "error",
                statusCode: 422,
                code: req.responseCode.UNPROCESSABLE_ENTITY,
                error: {
                    message: `role "${req.body.role}" does not exists`
                }
            };
        }

        req.$user = await req.$user.update(($user) => {
            if ($user.roles.indexOf(req.body.role) > -1) {
                throw {
                    status: "error",
                    statusCode: 422,
                    code: req.responseCode.UNPROCESSABLE_ENTITY,
                    error: {
                        message: `Role "${req.body.role}" already exists`
                    }
                };
                return $user;
            }

            $user.roles.push(req.body.role);

            return $user;
        })

        if (req.$user.roles.indexOf(req.body.role) == -1) {
            return;
        }

        throw {
            status: "success",
            statusCode: 202,
            code: req.responseCode.UPDATED,
            message: "Role Added",
            data: {
                roles: req.$user.roles
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