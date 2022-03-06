const response = require("../utils/response.utitlity");
const validate = require("../validations/updates.validate");
const updatesService = require("../service/update.service");
const tokenService = require("../service/token.service");
const recoveryService = require("../service/recovery.service");
const security_questionService = require("../service/security_question.service");

exports.update_password = async (req, res) => {
  try {
    validate.header(req.headers)
    validate.password(req.fields)
    await tokenService.token_validate(req.fields.auth_token)
    var decode_token = await tokenService.decode_token(req.fields.auth_token)
    await recoveryService.set_last_pass(decode_token)
    // return response.success(res, "done")
    response.success(res,
      await updatesService.update_password(decode_token, req.fields)
    )
  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.phone_update = async (req, res) =>
{
  try {
    validate.header(req.headers)
    validate.phone_number(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    response.success(res,
        await updatesService.update_phone(decode_token, req.fields)
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.email_update = async (req, res) =>
{
  try {
    validate.header(req.headers)
    validate.email(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    response.success(res,
        await updatesService.update_email(decode_token, req.fields)
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.user_information = async (req, res) =>
{
  try {
    validate.user_information_header(req.headers)
    validate.user_information(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)

    var result = await updatesService.user_information(decode_token, req.fields)
    response.success(res, result)

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.update_role = async (req, res) =>
{
  try {
    validate.header(req.headers)
    validate.role(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    response.success(res,
        await updatesService.role(decode_token, req.fields)
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.company_information_update = async (req, res) =>
{
  try {
    validate.company_information_header(req.headers)
    validate.company_information(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)

    var result = await updatesService.company_information(decode_token, req.fields)
    response.success(res, result)

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.delete_user = async (req, res) => {
  try {
    validate.header(req.headers)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    return response.success(res,
        await updatesService.delete_user(decode_token, req.headers.service)
    )
  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.update_security_question = async (req, res) =>
{
  try {
    validate.header(req.headers)
    validate.security_question(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decoded_token = await tokenService.decode_token(req.headers.auth_token)
    await security_questionService.checking_security_questions(req.fields)

    const result = await security_questionService.save_security_answers(req.fields, decoded_token)

    return response.success(res, result)
  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.update_social_media = async (req, res) =>
{
  try {
    await tokenService.token_validate(req.headers.auth_token)
    var decoded_token = await tokenService.decode_token(req.headers.auth_token)
    response.success(res,
        await updatesService.update_social_media(decoded_token, req.fields)
    )
  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.update_configurations = async (req, res) =>
{
  try {
    validate.configurations_header(req.headers)
    validate.configurations(req.fields)
    await tokenService.token_validate(req.headers.auth_token)
    var decoded_token = await tokenService.decode_token(req.headers.auth_token)

    req.fields.configurations = JSON.parse(req.fields.configurations)
    var result = await updatesService.update_configurations(decoded_token, req.fields)

    response.success(res, result)
  } catch (e) {
    return response.exception(res, e.message);
  }
}