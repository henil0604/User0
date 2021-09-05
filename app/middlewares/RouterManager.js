const express = require("express");

const createRouter = (data) => {

    let router = express.Router();

    router = Appify(router, data);

    return router;
}

const Appify = (app, data) => {

    data.forEach(d => {
        d = HitPointInterface(d);

        if (d.type == "hitpoint") {
            app[d.method.toLowerCase()](
                d.path,
                ...d.middlewares
            )
        }

        if (d.type == "static") {
            app.use(
                d.path,
                express.static(d.serve)
            );
        }

        if (d.type == "middleware") {
            app.use(d.path, ...d.middlewares)
        }

        if (d.type == "router") {
            app.use(
                d.path,
                createRouter(d.routes)
            )
        }

    })

    return app;
}

const HitPointInterface = (data) => {

    if (typeof data != "object") {
        data = {}
    }

    if (!data.type) {
        data.type = "hitpoint";
    }

    if (!data.path) {
        throw new Error("Path Not Provided");
    }

    if (!data.method && data.type == "hitpoint") {
        data.method = "GET"
    }

    if (!data.middlewares && data.type == "hitpoint") {
        data.middlewares = [];
    }

    if (!data.routes && data.type == "router") {
        data.routes = [];
    }

    if (!data.serve && data.type == "static") {
        throw new Error("Serve Not Provided");
    }

    if (!data.middlewares && data.type == "middleware") {
        data.middlewares = [];
    }

    return data;
}

const RouterManager = (app, data) => {
    app = Appify(app, data);

    return app;
};

RouterManager.__proto__.HitPointInterface = HitPointInterface;
RouterManager.__proto__.createRouter = createRouter;

module.exports = RouterManager;