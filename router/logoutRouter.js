const express = require("express");
const logoutController = require("../controller/logoutController");

//create router

const router = express.Router();

router.get("/", logoutController);

module.exports = router;
