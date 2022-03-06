const jwt = require("jsonwebtoken");

exports.sign = async (json_values) => {
  return await jwt.sign(json_values,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.expiresIn
      }
  );
}

exports.verify = async (token, callback) =>
{
  return await jwt.verify(token,process.env.JWT_SECRET,function(err, token)
  {
    if (err) return callback(err, null)
    if (token) return callback(null, true)
  })
}

exports.decode = async (token) =>
{
  return await jwt.decode(token, process.env.JWT_SECRET);
}

exports.destroy = async (token) =>
{
  jwt.destroy(token)
      .then((r)=>console.log(r) )
      .catch((e)=>console.log(e) )
}
