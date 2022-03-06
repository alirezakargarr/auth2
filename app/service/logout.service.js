const JWT = require("./../utils/JWT.utility");

exports.logout = async (token) =>
{
  return await JWT.destroy(token)
}