module.exports = [
    {
        path: "/",
        method: "GET",
        type: "hitpoint",
        middlewares: [
            async (req, res) => {
                res.send("Hello From /api")
            }
        ]
    },
    {
        path: "/user",
        type: "router",
        routes: require("./user.api.routes")
    },
    {
        path: "/register",
        method: "POST",
        type: "hitpoint",
        middlewares: [
            require("../routes/api/register")
        ]
    },
    {
        path: "/login",
        method: "POST",
        type: "hitpoint",
        middlewares: [
            require("../routes/api/login")
        ]
    },
]