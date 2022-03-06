const response = require("../utils/response.utitlity");
const address_service = require("../service/address.service");
const Exception = require('../utils/error.utility');
const tokenService = require("../service/token.service");
const validate = require("./../validations/address.validate");
const updateService = require("./../service/update.service");

exports.get_address = async (req, res) =>
{
  try {
    const class_address = new address_service()
    // console.log(req.query)
    const address = await class_address.get_address_with_lat_long(req.query)
    if (!address.status)
      throw Exception.setError("your request was false")


    return response.success(res, address)
  } catch (e) {
    return response.exception(res, e.message);
  }

}

exports.add_address = async (req, res) => {
  try {
    validate.header(req.headers)
    var json = JSON.parse(req.fields.address)
    await tokenService.token_validate(req.headers.auth_token)
    var decode_token = await tokenService.decode_token(req.headers.auth_token)

    console.log(decode_token.id)
    var result = await updateService.update_address(decode_token, json)
    return response.success(res, result)
  } catch (e) {
    return response.exception(res, e.message);
  }

}