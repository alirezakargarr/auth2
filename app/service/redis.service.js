// const redis = require("redis");
// const redisClient = redis.createClient(6379, "redis");
// redisClient.on('connect', function() {
//   console.log('Connected!');
// });
const redisClient = require("./../utils/redis.utility");

const response = require("./../utils/response.utitlity");

exports.sms_phone_number_blocking = async (req, res, next) =>
{
  redisClient.get(req.fields.phone_number, (err, data) => {
    if (data !== null)
    {
      const result = JSON.parse(data)
      var new_time = result.phone_number_time + 1

      if (new_time === 6) return response.error(res, "you was blocking, please try again after 2H")
      redisClient.setex(req.fields.phone_number,
          parseInt(process.env.redisBlockTime),
          JSON.stringify({phone_number_time: new_time}))
      // console.log(data)
    } else {
      redisClient.setex(req.fields.phone_number,
          parseInt(process.env.redisBlockTime),
          JSON.stringify({phone_number_time:1}))
    }
    next();
  })

}