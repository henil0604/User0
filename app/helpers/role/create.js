const Role = require("../../Models/Role");
const helperJs = require("@henil0604/helperjs");


module.exports = async (data = {}) => {

    data.roleId = helperJs.random(23)

    const role = new Role(data);

    return await role.save(data);
}