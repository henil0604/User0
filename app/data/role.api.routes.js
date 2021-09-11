module.exports = [
    {
        path: "/",
        method: "GET",
        middlewares: [
            (req, res) => {
                res.send("Hello From /api/roles")
            }
        ]
    }
]