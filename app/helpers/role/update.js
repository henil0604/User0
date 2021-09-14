const Role = require("../../Models/Role");

module.exports = async (data, callback) => {
    const $role = await Role.findOne(data);

    if (!$role) {
        return null
    }

    let updated = callback($role);
    if (!updated) {
        return null;
    }

    await Role.findOneAndUpdate({
        roleId: $role.roleId
    }, {
        $set: updated
    })

    return updated;
}