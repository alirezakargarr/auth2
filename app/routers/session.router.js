const express = require("express");
const Router = express.Router();
const session = require("../controller/session.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/sessions/get')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        session.get_sessions
    )

Router
    .route('/sessions/delete')
    .delete(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        session.delete_session
    )

module.exports = Router;
