const User = require('../../Models/User');
const updateUser = require("./update");

module.exports = async (data) => {
    let $user = await User.findOne(data) || null;

    $user.__proto__.update = async (callback) => {
        const updated = await updateUser({ userId: $user.userId }, callback);
        return updated;
    }

    return $user;
}