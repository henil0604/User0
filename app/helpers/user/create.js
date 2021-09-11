const User = require('../../Models/User');
const helperJs = require("@henil0604/helperjs");


module.exports = async (data) => {
    data.userId = helperJs.random(23);

    const user = new User(data);

    return await user.save(data)
}