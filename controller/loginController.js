// extarnal imports
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

//intarnal imports
const User = require("../models/user");

// main login function
const login = async (req, res, next) => {
  try {
    // check the username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        //prepare user object and generate token
        const userObject = {
          user: user._id,
          name: user.name,
        };

        const token = jwt.sign(userObject, process.env.JWT_SECRET);

        res
          .cookie("token", token, {
            httpOnly: false,
          })
          .json({
            message: "login successful",
          });
      } else {
        //throw error
        // throw createError("incorrect username or password");
        throw createError("incorrect username or password");
      }
    } else {
      //throw error
      throw createError("incorrect username or password ");
    }
  } catch (error) {
    res.status(400);
    res.json({ message: error.message });
  }
};

module.exports = { login };
