require("dotenv").config();
module.exports = (key, filter = true) => {
    let val = process.env[key];

    if (filter && val == "true") {
        val = true;
    }

    if (filter && val == "false") {
        val = false;
    }

    if (filter && val == "null") {
        val = null;
    }

    if (filter && val == "undefined") {
        val = undefined;
    }

    return val;
}