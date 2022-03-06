const model = require("../model/users.model")
const {v4: uuidv4} = require('uuid');

exports.update_user_wallet_id = async (user_data) =>
{
  if (user_data[0].wallet_id !== null)
    return

  var save = {}, wallet_id = {}
  // generate wallet_id
  var role = JSON.parse(user_data[0].role)
  for (i = 0; i < role.length; i++) {
    wallet_id[role[i]] = uuidv4()
  }
  save.wallet_id = wallet_id
  return await model.update_items(save)
}

exports.update_user_packet_id = async (user_data) =>
{
  if (user_data[0].packet_id !== null)
    return

  var save = {}, packet_id = {}
  // generate packet_id
  var service = JSON.parse(user_data[0].service)
  for (i = 0; i < service.length; i++) {
    packet_id[service[i]] = uuidv4()
  }
  save.packet_id = packet_id
  return await model.update_items(save)
}

exports.send_wallet_id = async (user_data, role, headers) =>
{
  // dont forget to use AWAIT for axios
  console.log(user_data[0])
  console.log(role)
  console.log(headers)
}