const express = require("express");
const Router = express.Router();
const search = require("../controller/search.controller");
const session = require("./../controller/session.controller");
const admin = require("./../controller/admin.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/search_users')
    .post(
        authentication.API_authenticaiton_admin,
        session.check_for_block_sessions,
        admin.admin_token_checking,
        search.search
    )

module.exports = Router;
