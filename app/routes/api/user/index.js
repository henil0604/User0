
module.exports = async (req, res) => {
    const $user = req.$user;
    req.resolve(req.createResponse({
        status: "success",
        statusCode: 200,
        code: req.responseCode.DATA_PROVIDED,
        message: "Data Provided",
        data: {
            username: $user.username,
            email: $user.email,
            status: $user.status,
            verifiedBy: $user.verifiedBy,
            roles: $user.roles,
            method: $user.method,
            userId: $user.userId,
            createdAt: $user.createdAt,
            createdBy: $user.createdBy,
        }
    }))
}