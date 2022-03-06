const express = require("express");
const Router = express.Router();
const login = require("../controller/login.controller");
const admin = require("./../controller/admin.controller");
const user_data = require("./../controller/get_user_data.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route("/admin/block-user")
    .post(
        authentication.API_authenticaiton_admin,
        admin.admin_token_checking,
        user_data.get_user_detail_for_admin
    )

Router
    .route('/login/admin')
    .post(
        authentication.API_authenticaiton_admin,
        login.admin_login_sms
    )

Router
    .route('/admin/register')
    .post(
        authentication.API_authenticaiton_admin,
        admin.register
    )

Router
    .route('/admin/get/service_role')
    .get(
        authentication.API_authenticaiton,
        admin.get_admin_service
    )

Router
    .route('/')
    .get((req, res) => {
        res
            .status(200)
            .send("connected...")
    })

module.exports = Router;
