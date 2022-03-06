const _ = require("lodash");
const userModel = require("../model/users.model")
const model = require("../model/users.model")
const sessionModel = require("../model/session.model");
const Exception = require('../utils/error.utility');

exports.update_service = async (id, headers) =>
{
  model.condition = { id : id }
  const user_info = await model.get_all();

  const user_services = JSON.parse(user_info[0].service)
  if ( !_.includes(user_services, headers[0]) )
  {
    user_services.push(headers[0])
    userModel.condition = { id : user_info[0].id }

    await userModel.update_items({ service : JSON.stringify(user_services) })
  }
}

exports.update_role = async (id, role) =>
{
  model.condition = { id : id }
  const user_info = await model.get_all();

  var user_role = JSON.parse(user_info[0].role);

  if (!_.includes(user_role, role[0]))
  {
    userModel.condition = { id : user_info[0].id }
    user_role.push(role[0])
    console.log(user_role)
    await userModel.update_items({ role : JSON.stringify(user_role) })
  }

}

exports.get_user_data = async (user_info) =>
{
  userModel.condition = { id : user_info.id }
  return await userModel.get_all()
}

exports.update_user_sessions = async(fields) =>
{
  sessionModel.condition = { user_id : fields.user_id }
  if (await sessionModel.counts() === 0)
    throw Exception.setError("this user dosent have any active session yet!")

  return await sessionModel.update_items({
    block_status : fields.block
  })
}

exports.get_active_sessions = async (user_info) =>
{
  sessionModel.condition = { user_id : user_info.id }
  return await sessionModel.select()
}

exports.update_user_sessions = async(fields) =>
{
  sessionModel.condition = { user_id : fields.user_id }
  if (await sessionModel.counts() === 0)
    throw Exception.setError("this user dosent have any active session yet!")

  return await sessionModel.update_items({
    block_status : fields.block
  })
}