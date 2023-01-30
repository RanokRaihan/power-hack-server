//external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//intarnal imports
const User = require("../models/user");

const signup = async (req, res, next) => {
    let newUser;
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    try {
        // save to database
        const result = await newUser.save();
        const token = jwt.sign(
            { user: result._id, name: result.name },
            process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
        }).send({
            message: "user registration successfull",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { signup };
