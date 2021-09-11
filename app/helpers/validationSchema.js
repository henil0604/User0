const Joi = require("joi");


const Register = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(4)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    roles: Joi.array(),

    createdBy: Joi.string()
        .required()

})


module.exports = {
    Register
}