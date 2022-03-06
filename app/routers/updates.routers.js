const express = require("express");
const Router = express.Router();
const updates = require("../controller/updates.controller");
const session = require("./../controller/session.controller");
const authentication = require("./../controller/basic_authentication.controller");

Router
    .route('/user/update/password')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.update_password
    )

Router
    .route('/user/update/phone-number')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.phone_update
    )

Router
    .route('/user/update/email')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.email_update
    )

Router
    .route('/user/update/user-information')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.user_information
    )

Router
    .route('/user/update/role')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.update_role
    )

Router
    .route('/user/update/company-information')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.company_information_update)

Router
    .route('/user/delete-account')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.delete_user
    )

Router
    .route('/user/update/security_question')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.update_security_question)

Router
    .route('/user/update/social_media')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.update_social_media)

Router
    .route('/user/update/configurations')
    .post(
        authentication.API_authenticaiton,
        session.check_for_block_sessions,
        updates.update_configurations
    )

module.exports = Router;
