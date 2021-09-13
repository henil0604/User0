module.exports = [
    {
        path: "/",
        method: "GET",
        type: "hitpoint",
        middlewares: [
            async (req, res) => {
                res.send("Hello From /api/user")
            }
        ]
    },
    {
        path: "/",
        method: "POST",
        middlewares: [
            require("../middlewares/isAuthorized"),
            require("../routes/api/user")
        ]
    }
]