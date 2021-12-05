const express = require("express");
const signUpRoute = express.Router();

const {
    newUser,
} = require("../controllers/signUp");

signUpRoute.post("/add-user", newUser);


module.exports = signUpRoute;
