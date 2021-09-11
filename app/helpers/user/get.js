const User = require('../../Models/User');


module.exports = (data) => {
    return User.findOne(data) || null;
}