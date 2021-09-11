const mongoose = require("mongoose");
const env = require("./env");

let data = {
    defaultConnectionURI: env("MONGO_CONNECTION_URI") || "mongodb://localhost:27017"
};


const mongo = async (connectionURI = data.defaultConnectionURI) => {
    const conn = (await mongoose.connect(data.defaultConnectionURI || connectionURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })).connection

    return conn;
}

mongo.__proto__.setDefaultConnectionURI = (uri) => {
    data.defaultConnectionURI = uri;
}

module.exports = mongo;