const response = require("../utils/response.utitlity");
const validate = require("./../validations/user_data.validate");
const tokenService = require("../service/token.service");
const userService = require("../service/user.service");
const admin_service = require("../service/admin.service");

exports.get_user_detail = async (req, res) =>
{

  try {
    validate.header(req.headers)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token);
    const user_data = await userService.get_user_data(decode_token)

    response.success(res, user_data)
  } catch (e) {
    return response.exception(res, e.message);
  }

}

exports.is_login = async (req, res) =>
{

  try {
    validate.header(req.headers)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token);
    const user_data = await userService.get_active_sessions(decode_token)

    response.success(res, user_data)
  } catch (e) {
    return response.exception(res, e.message);
  }

}

exports.get_user_detail_for_admin = async (req, res) =>
{
  try {
    if (req.fields.block === "true")
    {
      req.fields.block = true
    }
    if (req.fields.block === "false")
    {
      req.fields.block = false
    }
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    await admin_service.checking_admin_and_user_service(req.headers.service, req.fields, decode_token)
    const user_data = await userService.update_user_sessions(req.fields)

    response.success(res, user_data)
  } catch (e) {
    return response.exception(res, e.message);
  }

}