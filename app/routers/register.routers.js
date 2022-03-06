const express = require("express");
const Router = express.Router();
const register = require("../controller/register.controller");
const session = require("./../controller/session.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/register')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        register.add
    )

module.exports = Router;
