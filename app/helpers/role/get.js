const Role = require("../../Models/Role");


module.exports = (data) => {
    return Role.findOne(data) || null;
}