const login_model = require("./../model/login.model");
const session_model = require("./../model/session.model")
const  { v4: uuidv4 }  = require('uuid');
const Exception = require('../utils/error.utility');

exports.set_session = async (req, data) =>
{
  if (!req.session.user_id)
  {
    login_model.condition = { username : req.fields.username }
    const user_information = await login_model.select()
    if (req.session.user_id !== data.toString())
      console.log("session set "+req.session.id)

    // session_model.condition = { user_id : data.id }
    // var user_session_data = await session_model.select();
    // if (user_session_data[0])
    //   if (user_session_data[0].session_id === req.session.id)
    //     return

    if (await session_model.counts() < 5) {
      // save
      session_model.condition = ``
      var json = {
        id: uuidv4(),
        user_id: data.id,
        session_id: req.session.id,
        block_status: false
      }
      await session_model.save(json)
    } else {
      // update
      // session_model.condition = { session_id : eq.session.id }
      throw Exception.setError("you cant have more than 3 active session")

    }

    return req.session.user_id = data.id.toString()
  }

}

exports.get_sessions = async (user_info) =>
{
  session_model.condition = { user_id : user_info.id }
  return await session_model.select()
}

exports.get_sessions_by_session_id = async (session_id) =>
{
  session_model.condition = { session_id : session_id }
  if (await session_model.counts() === 0) return null
  return await session_model.select()
}

exports.delete_session_by_id = async ({id}) =>
{
  session_model.condition = { id : id }
  return await session_model.destroy()
}