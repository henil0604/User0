const mongoose = require("mongoose");
const mongo = require("./mongo");
const log = require("./log");
const prefix = "M"

module.exports = async () => {
    try {
        if (mongoose.connection.readyState != 0) {
            log("Closed Existing Connection", "info", prefix)
            await mongoose.connection.close();
        }

        log("Connecting...", "info", prefix)
        mongo();

        mongoose.connection.on("connected", () => {
            log("Connected", "success", prefix)
        })

        mongoose.connection.on("error", () => {
            log("Error occurred While Connecting to Mongo", "error", prefix)
        })

        mongoose.connection.on("disconnected", () => {
            log("Disconnected", "info", prefix)
        })

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })

    } catch (e) {
        log("Error occurred While Initializing Mongo", "error", prefix)
    }
}