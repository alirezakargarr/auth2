const express = require("express");
const Router = express.Router();
const addres_controller = require("../controller/address.controller")
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/get-address')
    .post(
        authentication.API_authenticaiton_admin,
        addres_controller.get_address
    )

Router
    .route('/add-address')
    .post(
        authentication.API_authenticaiton_admin,
        addres_controller.add_address
    )

module.exports = Router