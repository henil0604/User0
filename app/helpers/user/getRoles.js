const User = require('../../Models/User');
const getUser = require('./get');


module.exports = async (data) => {
    const user = await getUser(data);

    if (!user) return null

    return user.roles;
}