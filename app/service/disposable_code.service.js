const disposable_codeModel = require("./../model/disposable_code.model");
const Exception = require('../utils/error.utility');
const p = require("./../utils/persion_date.utility");
const log = require("../utils/log.utility");

exports.get_all_valide_codes = async () =>
{
  disposable_codeModel.condition = { status : true }
  disposable_codeModel.limit = { limit : 30 }
  return await disposable_codeModel.select()
}

exports.expire_the_code = async (id) =>
{
  disposable_codeModel.condition = { id }
  log.info("--> set false: "+ id)
  return await disposable_codeModel.update_items(
      {
        status : false
      }
  )
}

exports.check_for_expire = (ArrayList) => {
  var time = ""
  var date = ""

  try {

    for (let i = 0; i < ArrayList.length; i++)
    {
      const code_date = ArrayList[i].date.split("/")
      const time = ArrayList[i].hour.split(":")

      var date_all = ""
      for (let i = 0; i < code_date.length; i++)
      {
        date_all = date_all + code_date[i]
      }

      if (parseInt(p.date_chasb()) > parseInt(date_all))
      {
        this.expire_the_code(ArrayList[i].id)
      }

      var hour = time[0]
      var minute = time[1]
      for (t = 0; t < 10; t++)
      {
        minute = parseInt(minute) + 1
        if (minute === 60)
        {
          minute = 0;
          for (j = 0; j < t; j++) { minute = parseInt(minute) + 1 }
          hour = parseInt(hour) + 1
          if (hour === 25)
          {
            hour = 0
          }
        }
      }
      //

      const now_time_minute = p.now_minute()
      const now_hour_minute = p.now_hour()

      // console.log(hour+ " " +minute)
      // console.log(now_hour_minute+ " " +now_time_minute)
      //
      if (
          parseInt(now_time_minute) > parseInt(minute) && parseInt(now_hour_minute) >= parseInt(hour)
      ) {
        this.expire_the_code(ArrayList[i].id)
      }
      // if (
      //     parseInt(now_hour_minute) > parseInt(hour)
      // ) {
      //   this.expire_the_code(ArrayList[i].id)
      // }

    }

  } catch (error) {
    throw Exception.setError(error, false);
  }
}

exports.code_checking = async (code) =>
{
  // return console.log(code)
  // disposable_codeModel.limit = {}
  disposable_codeModel.condition = { status : true , code : parseInt(code) } 
  var count = await disposable_codeModel.counts()
  if (count === 0)
  {
    return {
      status: false
    }
  }
  var result = await disposable_codeModel.select()
  if ( result[0].code === parseInt(code) ) return {
    status: true,
    id: result[0].user_id
  }
  disposable_codeModel.condition = {}
}