const express = require("express");
const authController = require("../controller/authController");

//create router

const router = express.Router();

router.get("/", authController);

module.exports = router;
