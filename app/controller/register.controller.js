const response = require("../utils/response.utitlity");
const validate = require("../validations/register.validate");
const registerService = require("./../service/register.service");
const log = require("../utils/log.utility");
const Exception = require('../utils/error.utility');
const adminService = require("./../service/admin.service");
const searchService = require("./../service/search.service");
const _ = require("lodash");

exports.add = async (req, res) => {
  try {
    validate.header(req.headers)
    validate.add(req.fields)

    var headers = JSON.parse(req.headers.service)
    var role = JSON.parse(req.fields.role)
    if (headers.length >= 2 || role.length >= 2)
      return response.exception(res, "array length can't be more than 1");
    if (req.fields.role === "admin")
      return response.exception(res, "You can't be admin");

    await registerService.check_for_available_admin_role()
    var data = await searchService.get_admin_service_by_service({
      service: headers[0]
    }, headers)

    if (!_.includes(JSON.parse(data.user_service_role), role[0]))
      throw Exception.setError("this role isen available for this service")

    var search_json = {}
    search_json.service = headers[0]
    if (!await searchService.check_for_available_admin_service(search_json, headers))
      throw Exception.setError("this service dosent have any admin")

    if (!await registerService.check_for_available(req.fields))
      return response.success(res, "You have registered before")


    response.success(res,
        await registerService.add(req.fields, req.headers.service)
    )

  } catch (e) {
    return response.exception(res, e.message);
  }
}