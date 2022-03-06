const JWT = require("./../utils/JWT.utility")
const Exception = require('../utils/error.utility');

exports.token_validate = async (token) => {
  return await JWT.verify(token, (err, token) => {
    if (err) throw Exception.setError("your token is not valid")
  })
}

exports.decode_token = async (token) =>
{
  return await JWT.decode(token)
}
