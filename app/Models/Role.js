const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        default: []
    },
    roleId: {
        type: String,
        required: true
    }
})




module.exports = mongoose.model("role", RoleSchema);