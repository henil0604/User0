const log = require("./log");
const helperJs = require("@henil0604/helperjs");

module.exports = (data) => {
    let response = {};
    
    response._ = {};

    response._.responseTime = Date.now();
    response._.responseToken = helperJs.random(helperJs.random.number(73, 231))

    response = {
        ...response,
        ...data,
    }


    log.fileLog({
        data: response
    });

    return response;
}