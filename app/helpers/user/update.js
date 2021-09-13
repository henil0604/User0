const User = require("../../Models/User");
const getUser = require("./get");

module.exports = async (data, callback) => {
    const $user = await User.findOne(data);

    if (!$user) {
        return null
    }

    let updated = callback($user);
    if (!updated) {
        return null;
    }

    await User.findOneAndUpdate({
        userId: $user.userId
    }, {
        $set: updated
    })

    return updated;
}