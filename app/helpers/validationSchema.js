const Joi = require("joi");


const Register = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(4),

    email: Joi.string()
        .email()
        .required(),

    roles: Joi.array(),

    createdBy: Joi.string()
        .required(),

    method: Joi.string()
        .required(),

    authId: Joi.string()
})

const Login = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(4),

    method: Joi.string()
        .required(),

    authId: Joi.string(),


})


module.exports = {
    Register,
    Login
}