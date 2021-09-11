const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    },
    permissionId: {
        type: String,
        required: true
    }
})




module.exports = mongoose.model("permission", PermissionSchema);