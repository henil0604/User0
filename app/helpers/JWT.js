const jwt = require("jsonwebtoken");
const env = require("./env")

let JWT = {};

if(!env("ACCESS_TOKEN_PRIVATE_KEY")){
    throw new Error("ACCESS_TOKEN_PRIVATE_KEY not found");
}

if(!env("REFRESH_TOKEN_PRIVATE_KEY")){
    throw new Error("REFRESH_TOKEN_PRIVATE_KEY not found");
}


JWT.generate = {};

JWT.generate.accessToken = (data, expiresIn=env("ACCESS_TOKEN_DEFAULT_EXPIRE_TIME")) => {
    let options = {}

    if(expiresIn){
        options.expiresIn = expiresIn;
    }

    return jwt.sign(data, env("ACCESS_TOKEN_PRIVATE_KEY"), options);
}

JWT.generate.refreshToken = (data, expiresIn=env("REFRESH_TOKEN_DEFAULT_EXPIRE_TIME")) => {
    let options = {}

    if(expiresIn){
        options.expiresIn = expiresIn;
    }

    return jwt.sign(data, env("REFRESH_TOKEN_PRIVATE_KEY"), options);
}





module.exports = JWT;