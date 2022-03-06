const  { v4: uuidv4 }  = require('uuid');
const model = require("../model/users.model")
const Exception = require('../utils/error.utility');
const _ = require("lodash");
const searchService = require("./search.service");

exports.check_for_admin_available = async (fields) =>
{
  model.condition = { username : fields.username }
  console.log(await model.count_all())
  if (await model.count_all() !== 0)
    throw Exception.setError("this username is available now")

  model.condition = { phone_number : fields.phone_number }
  if (await model.count_all() !== 0)
    throw Exception.setError("this phone number is available now")

}

exports.add_admin = async (fields) =>
{
  fields.id = uuidv4()
  return await model.save(fields)
}

exports.check_for_service_available = async () =>
{

}

exports.checking_admin_and_user_service = async (service_header, { user_id }, {service}) =>
{
  model.condition = { id : user_id }
  const result = await model.get_all()
  if (!result)
    throw Exception.setError("this user is not exist")

  if (!_.includes(result[0].service, JSON.parse(service)[0]))
    throw Exception.setError("you are not admin this user")
}

exports.get_admin_service = async () =>
{
  // searchService.get_admin_service_by_service({ service:  })
  return "admin"
}
