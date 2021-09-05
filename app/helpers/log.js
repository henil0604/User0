const chalk = require("chalk");
const env = require("./env");
const path = require("path");
var appRoot = require('app-root-path');
const fs = require('fs');

let defaultPrefix = ">";

let fileLog = (data) => {

    const logPath = data.FILE_LOG_PATH || env("FILE_LOG_PATH")

    if (!logPath) return false;

    let dir = path.join(appRoot.toString(), logPath);

    data.FILE_LOG_PATH ? delete data.FILE_LOG_PATH : null;
    data.stime = Date.now();

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let logFile = path.join(dir, `${parseInt(Date.now() / 1000 / 60 / 60)}.json`);


    if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, "[]")
    }

    let pastData = JSON.parse(fs.readFileSync(logFile, "utf8"));

    pastData.push(data);

    fs.writeFileSync(
        logFile,
        JSON.stringify(pastData)
    )

}

let log = (text = "", status = "info", prefix = defaultPrefix, fileLogging = env("FILE_LOG_PATH")) => {
    let t = `${prefix} `;

    if (status == "log") {
        t = chalk.whiteBright(t)
        return;
    }
    if (status == "success") {
        t = chalk.greenBright(t);
    }
    if (status == "info") {
        t = chalk.cyanBright(t);
    }
    if (status == "warn") {
        t = chalk.yellowBright(t);
    }
    if (status == "error") {
        t = chalk.redBright(t);
    }

    t += text;

    console.log(t);

    if (fileLogging) {
        try {
            fileLog({
                text,
                status,
                FILE_LOG_PATH: fileLogging
            })
        } catch { }
    }
}

log.__proto__.setDefaultPrefix = (prefix = "") => { defaultPrefix = prefix };
log.__proto__.chalk = chalk;
log.__proto__.fileLog = fileLog;

module.exports = log;