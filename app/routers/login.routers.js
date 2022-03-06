const express = require("express");
const Router = express.Router();
const login = require("../controller/login.controller");
const session = require("./../controller/session.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/login')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        login.login
    )

Router
    .route('/logout')
    .post(
        login.logout
    )

module.exports = Router;
