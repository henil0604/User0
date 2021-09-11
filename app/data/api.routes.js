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
        path: "/role",
        type: "router",
        routes: require("./role.api.routes")
    },
    {
        path: "/register",
        method: "POST",
        type: "hitpoint",
        middlewares: [
            require("../routes/api/register")
        ]
    },
]