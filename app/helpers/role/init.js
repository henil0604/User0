const Role = require("../../Models/Role");
const createRole = require("./create");
const getRole = require("./get");

module.exports = async () => {
    // Checks if "primary" role Exists
    const primaryDoc = await getRole({
        name: "primary"
    })

    if (!primaryDoc) {
        return await createRole({
            name: "primary",
            permissions: [
                "user.edit_account",
                "user.login",
                "user.logout",
                "user.change_password",
                "user.delete_account",
            ]
        })
    }


}