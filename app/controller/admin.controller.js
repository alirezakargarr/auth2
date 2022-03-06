const response = require("../utils/response.utitlity");
const tokenService = require("../service/token.service");
const _ = require("lodash");
const validate = require("../validations/admin.validate");
const Exception = require('./../utils/error.utility');
const searchService = require("./../service/search.service");
const adminService = require("./../service/admin.service");
exports.admin_token_checking = async (req, res, next) =>
{
  // TEST
  // return next()
  try {
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)
    if (decode_token.role === "admin")
    {
      var service = JSON.parse(req.headers.service)
      var user_service = JSON.parse(decode_token.service)
      // console.log(user_service)
      // return console.log(service)
      if (!_.includes(user_service, service[0]))
        return response.error(res, "you are not from this platphorm")

      return next()
    } else {
      return response.error(res, "you are not admin")
    }

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.register = async (req, res) =>
{
  try {
    // validate.header(req.headers)
    validate.register(req.fields)
    var service = JSON.parse(req.fields.service)
    if (service.length >= 2)
      throw Exception.setError("your service length can be more than 1");

    var search_json = {}
    search_json.service = service[0]
    await searchService.search_for_service_admins(search_json, service)

    await adminService.check_for_admin_available(req.fields)

    req.fields.role = "admin"
    var result = await adminService.add_admin(req.fields)
    return response.success(res, result)

  } catch (e) {
    return response.exception(res, e.message);
  }
}

exports.get_admin_service = async (req, res) => {
  try {
    var service = JSON.parse(req.headers.service)
    if (service.length >= 2)
      throw Exception.setError("your service length can be more than 1");

    var data = await searchService.get_admin_service_by_service({
      service: service[0]
    }, service)
    // console.log(data)
    // var result = await adminService.get_admin_service()
    return response.success(res, JSON.parse(data.user_service_role))
  } catch (e) {
    return response.exception(res, e.message);
  }

}