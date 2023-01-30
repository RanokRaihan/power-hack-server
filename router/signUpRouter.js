const express = require("express");
const { signup } = require("../controller/signupController");
const checkUser = require("../middleware/checkUser");
const { signupValidator } = require("../middleware/validator");

//create router

const router = express.Router();

router.post("/", signupValidator, checkUser, signup);

//export
module.exports = router;
