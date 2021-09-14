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
    },
    {
        path: "/addRole",
        method: "POST",
        middlewares: [
            require("../middlewares/isAuthorized"),
            require("../routes/api/user/addRole")
        ]
    },
    {
        path: "/removeRole",
        method: "POST",
        middlewares: [
            require("../middlewares/isAuthorized"),
            require("../routes/api/user/removeRole")
        ]
    }
]