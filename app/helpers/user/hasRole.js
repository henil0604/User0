const User = require('../../Models/User');
const getRoles = require("./getRoles");

module.exports = async (data, role) => {
    const userRoles = await getRoles(data);

    if (typeof role == "string") {
        role = [role];
    }

    if (!userRoles) return false;

    let matched = []

    for (let i = 0; i < userRoles.length; i++) {
        const r = userRoles[i];

        for (let j = 0; j < role.length; j++) {
            const e = role[j];

            if (e == r) {
                matched.push(e);
            }

        }
    }

    return {
        has: matched.length == role.length ? true : false,
        matched: matched
    };
}