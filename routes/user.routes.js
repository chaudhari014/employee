const express = require("express");
const userRoute = express.Router();
const { userLogin, userSignUp } = require("../controller/user.controller");
userRoute.post("/signup", userSignUp);
userRoute.post("/login", userLogin);

module.exports = { userRoute };
