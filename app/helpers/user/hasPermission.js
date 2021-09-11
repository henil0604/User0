const User = require('../../Models/User');
const getRoles = require('./getRoles');
const getRole = require("../role/get");


module.exports = async (data, permission) => {

    const userRoles = await getRoles(data);

    if (!userRoles) return false;

    if (typeof permission == "string") {
        permission = [permission];
    }

    let matched = [];

    for (let i = 0; i < userRoles.length; i++) {
        let role = userRoles[i];

        role = await getRole({ name: role })

        role.permissions.forEach((perm) => {
            if (permission.indexOf(perm) > -1) {
                matched.push(perm);
            }
        })

    }

    return {
        has: matched.length == permission.length ? true : false,
        matched
    }
}