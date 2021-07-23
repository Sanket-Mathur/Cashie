'use strict';
const { check } = require("express-validator");

const validation = [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("password", "Please enter a valid password").not().isEmpty()
]

module.exports = app => {
    const auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/login", validation, auth.login)

    app.use("/api/auth", router);
};