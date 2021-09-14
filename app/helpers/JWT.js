const jwt = require("jsonwebtoken");
const env = require("./env")

let JWT = {};

if (!env("ACCESS_TOKEN_PRIVATE_KEY")) {
    throw new Error("ACCESS_TOKEN_PRIVATE_KEY not found");
}

if (!env("REFRESH_TOKEN_PRIVATE_KEY")) {
    throw new Error("REFRESH_TOKEN_PRIVATE_KEY not found");
}

const keys = {
    accessToken: env("ACCESS_TOKEN_PRIVATE_KEY"),
    refreshToken: env("REFRESH_TOKEN_PRIVATE_KEY")
}


JWT.generate = {};

JWT.generate.accessToken = (data, expiresIn = env("ACCESS_TOKEN_DEFAULT_EXPIRE_TIME")) => {
    let options = {}

    if (expiresIn) {
        options.expiresIn = expiresIn;
    }

    return jwt.sign(data, keys.accessToken, options);
}

JWT.generate.refreshToken = (data, expiresIn = env("REFRESH_TOKEN_DEFAULT_EXPIRE_TIME")) => {
    let options = {}

    if (expiresIn) {
        options.expiresIn = expiresIn;
    }

    return jwt.sign(data, keys.refreshToken, options);
}

JWT.verify = {}

JWT.verify.accessToken = (token) => {
    try {
        return jwt.verify(token, keys.accessToken)
    } catch (e) {
        return null;
    }
}

JWT.verify.refreshToken = (token) => {
    try {
        return jwt.verify(token, keys.refreshToken)
    } catch (e) {
        return null;
    }
}




module.exports = JWT;