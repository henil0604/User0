const Role = require("../../Models/Role");
const updateRole = require("./update");

module.exports = async (data) => {
    let $role = await Role.findOne(data) || null;

    if (!$role) {
        return null;
    }

    $role.__proto__.update = async (callback) => {
        const updated = await updateRole({ roleId: $role.roleId }, callback);
        return updated;
    }

    return $role;
}