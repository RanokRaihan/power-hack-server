//intarnal imports
const User = require("../models/user");

const checkUser = async (req, res, next) => {
    try {
        // check the username
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
        });
        if (user && user._id) {
            res.status(400).json({
                message: "user already exist",
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: "user creation failed",
        });
    }
};

module.exports = checkUser;
