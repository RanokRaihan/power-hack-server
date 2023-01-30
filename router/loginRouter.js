const express = require("express");
const { login } = require("../controller/loginController");
const { loginValidator } = require("../middleware/validator");

//create router

const router = express.Router();

router.post("/", loginValidator, login);

module.exports = router;
