const mongoose = require("mongoose");
const mongo = require("./mongo");
const log = require("./log");
const prefix = "M"

async function connect() {

    const exitHandler = async () => {
        await mongoose.connection.close();
        process.exit(0);
    }

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

        const crashEvents = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`];

        crashEvents.forEach((eventType) => {
            process.on(eventType, exitHandler.bind(null, eventType));
        })

    } catch (e) {
        log(`ERROR: ${e.message}`, "error", prefix)
        log("Error occurred While Initializing Mongo", "error", prefix)
    }
}

module.exports = connect;