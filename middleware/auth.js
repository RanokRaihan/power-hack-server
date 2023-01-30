const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (token) {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                userId: verified.user,
                name: verified.name,
            };
            next();
        } else {
            throw createError("you are unauthorised!! Please Login First");
        }
    } catch (error) {
        res.status(401).send({ message: "Unauthorised access!!" });
    }
};

module.exports = auth;
