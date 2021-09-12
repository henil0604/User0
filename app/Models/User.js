const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "offline"
    },
    verifiedBy: {
        type: Array,
        default: []
    },
    roles: {
        type: Array,
        default: ["primary"]
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    authId: {
        type: String
    },
    method: {
        type: String,
        required: true,
    }
})


UserSchema.pre("save", async function (next) {
    try {

        const salt = await bcrypt.genSalt(11);


        if (this.method == "regular") {
            this.password = await bcrypt.hash(this.password, salt);
        } else {
            this.authId = await bcrypt.hash(this.authId, salt);
        }


        next();

    } catch (e) {
        next(e)
    }
})





module.exports = mongoose.model("user", UserSchema);