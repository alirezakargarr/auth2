const login_model = require("./../model/login.model");
const JWT = require("./../utils/JWT.utility");
const Exception = require('../utils/error.utility');
const _ = require("lodash")
const  { v4: uuidv4 }  = require('uuid');

exports.login = async (user_information, fields) =>
{
  if (user_information.length === 0) throw Exception.setError("your username or password is wrong!")

  if (
      user_information.password !== fields.password
  ) throw Exception.setError("your username or password is wrong!")

  return {
    token: await JWT.sign({
      id: user_information.id.toString(),
      role: user_information.role,
      username: user_information.username,
      wallet_id: user_information.wallet_id,
      packet_id: user_information.packet_id,
    })
  }

}

exports.login_with_user_and_pass = async (fields) =>
{
  var user_information = ""
  login_model.condition = { username : fields.username , password : fields.password }
  if (await login_model.count_all() !== 0) {
    user_information = await login_model.select()
  }

  login_model.condition = { email : fields.email , password : fields.password }
  if (await login_model.count_all() !== 0) {
    user_information = await login_model.select()
  }

  login_model.condition = { phone_number : fields.phone_number , password : fields.password }
  if (await login_model.count_all() !== 0) {
    user_information = await login_model.select()
  }

  if (user_information[0].password === fields.password)
  {
    return {
      token: await JWT.sign({
        id: user_information[0].id.toString(),
        role: user_information[0].role,
        username: user_information[0].username
      })
    }
  }
  throw Exception.setError("your username or password is wrong!")
}

exports.login_without_pass = async (fields) =>
{
  login_model.condition = { username : fields.username }
  const user_information = await login_model.select()

  return {
    token: await JWT.sign({
      id: user_information[0].id.toString(),
      role: user_information[0].role,
      username: user_information[0].username
    })
  }

}

exports.get_user_by_username = async (fields, headers) =>
{
  login_model.condition = { username : fields.username }
  if (await login_model.count_all() === 0)
    throw Exception.setError("we dont have this username")
  const user_information = await login_model.select()
  var service = fields.service;
  if (
      !_.includes(JSON.parse(user_information[0].service), headers[0])
  ) throw Exception.setError("you are not this service")

  return {
    id: user_information[0].id
  }
}

exports.active_sessions = async () =>
{

}

exports.get_user_by_id = async (user_id) =>
{
  login_model.condition = { id : user_id }
  const user_information = await login_model.select()
  return {
    token: await JWT.sign({
      id: user_information[0].id.toString(),
      role: user_information[0].role,
      service: user_information[0].service
    })
  }
}