const response = require("../utils/response.utitlity");
const recoveryService = require("../service/recovery.service");
const updateService = require("../service/update.service");
const validate = require("../validations/recovery.validate");
const disposableCodeService = require("../service/disposable_code.service");
const tokenService = require("../service/token.service");
const security_questionService = require("../service/security_question.service");
const loginService = require("../service/login.service");
// const redis = require("redis");
// const redisClient = redis.createClient(30743, "johnny.iran.liara.ir");
const redisClient = require("../utils/redis.utility");

exports.recovery = async (req, res) =>
{
  try {
    validate.recover(req.fields)
    var check_result = await disposableCodeService.code_checking(req.fields.code)
    if (!check_result.status)
      return response.success(res,"your code was wrong")

    await recoveryService.set_last_pass(check_result)


    response.success(res,
        await updateService.update_password(check_result, req.fields)
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.last_pass = async (req, res) =>
{
  try {
    validate.last_password_header(req.headers)
    validate.last_password(req.fields)

    const result = await recoveryService.get_last_user_password(req.fields)

    if (result.last_password !== req.fields.last_password)
      return response.success(res, "password wrong!")

    if (result.last_password === req.fields.last_password)
      return response.success(res,
          result.token
      )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.by_email = async (req, res) =>
{
  try {
    await validate.email(req.fields)
    const email_EXISTING = await recoveryService.email_checking(req.fields)
    if (email_EXISTING)
      return response.error(res, "this email is not exist")

    const user_info = await recoveryService.create_disposable_code(req.fields)


    return response.success(res,
        user_info
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.by_sms = async (req, res) =>
{
  try {
    await validate.phone(req.fields)
    const phone_EXISTING = await recoveryService.phone_checking(req.fields)
    if (phone_EXISTING)
      return response.error(res, "this phone number is not exist")

    // generate code
    const code = await recoveryService.create_disposable_code_with_phone(req.fields);
    await recoveryService.send_sms_for_recover(
        req.fields.phone_number,
        code.code
    )

    return response.success(res,
        "done"
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.recovery_by_answers = async (req, res) =>
{
  try {
    var headers = JSON.parse(req.headers.service)
    if ( headers.length >= 2 )
      return response.exception(res, "service array cant be more than 1");

    validate.security_answers_header(req.headers)
    req.fields.service = JSON.parse(req.headers.service)
    var information = await loginService.get_user_by_username(req.fields, headers)

    var result = await security_questionService.check_answers(req.fields, information)

    if (!result)
      return response.error(res, "your answer does not match")

    await recoveryService.set_last_pass(information)
    response.success(res,
          result
        )
  } catch (e) {
    return response.exception(res, e.message);
  }
}