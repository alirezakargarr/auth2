const usersModel = require("./../model/users.model");
const disposable_codeModel = require("./../model/disposable_code.model");
const  { v4: uuidv4 }  = require('uuid');
const p = require("../utils/persion_date.utility");
const MelipayamakApi = require('melipayamak')
const last_passwordModel = require("./../model/last_password.model");
const Exception = require('../utils/error.utility');
const JWT = require("./../utils/JWT.utility");

exports.set_last_pass = async (decoded_token) =>
{
  last_passwordModel.condition = { user_id : decoded_token.id }
  var last_password = await usersModel.get_all()
  // return console.log( last_password[0].password )
  if (await last_passwordModel.counts() === 0) {

    await last_passwordModel.save({
      id: uuidv4(),
      user_id: decoded_token.id,
      password: last_password[0].password
    })

  } else {
    // last_passwordModel.condition = { user_id : decoded_token.id }
    // var item = await last_passwordModel.select()
    // last_passwordModel.condition = { id : item[0].id }
    await last_passwordModel.update_items({
      password : last_password[0].password
    })
  }

}

exports.email_checking = async (fields) =>
{
  usersModel.condition = { email : fields.email } 
  if (await usersModel.count_all() === 0) return true

  return false
}

exports.phone_checking = async (fields) =>
{
  usersModel.condition = { phone_number : fields.phone_number } 
  if (await usersModel.count_all() === 0) return true

  return false
}

exports.create_disposable_code = async (fields) =>
{
  usersModel.condition = { email : fields.email }
  const user_information = await usersModel.get_all()

  disposable_codeModel.condition = { user_id : user_information[0].id } 
  var dis_item = await disposable_codeModel.select()

  var minm = 100000;
  var maxm = 999999;
  const random = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  var json = {
    id: uuidv4(),
    code: random,
    user_id: user_information[0].id,
    hour: p.hour(),
    date: p.date(),
    status: true
  }

  if ( dis_item.length === 1 )
  {
    // update
    disposable_codeModel.condition = { id : dis_item[0].id }
    return {
      result: await disposable_codeModel.update_items({
        hour : p.hour() , date : p.date() , code : random , status : true
      }),

      code: random,
      user_email: user_information[0].email
    }
  }

  return {
    result: await disposable_codeModel.save(json),
    code: random,
    user_email: user_information[0].email
  }

}

exports.create_disposable_code_with_phone = async (fields) =>
{
  usersModel.condition = { phone_number : fields.phone_number }
  const user_information = await usersModel.get_all()

  disposable_codeModel.condition = { user_id : user_information[0].id } 
  var dis_item = await disposable_codeModel.select()

  var minm = 100000;
  var maxm = 999999;
  const random = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

  var json = {
    id: uuidv4(),
    code: random,
    user_id: user_information[0].id,
    hour: p.hour(),
    date: p.date(),
    status: true
  }

  if ( dis_item.length === 1 )
  {
    // update
    disposable_codeModel.condition = { id : dis_item[0].id }
    return {
      result: await disposable_codeModel.update_items({
        hour : p.hour() , date : p.date() , code : random , status : true
      }),
      code: random,
      phone_number: user_information[0].phone_number
    }
  }

  return {
    result: await disposable_codeModel.save(json),
    code: random,
    phone_number: user_information[0].phone_number
  }

}

// exports.recover_by_email
exports.send_sms_for_recover = async (phone_number, code) =>
{
  const username = '09190914073';
  const password = '981bmhe';
  const api = new MelipayamakApi(username,password);
  const sms = api.sms();
  const to = "09376489525";
  const from = '30008666914073';
  const text = `${code}کد امنیتی شما `;
  sms.send(to,from,text).then(res=>{
    //RecId or Error Number
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
  return phone_number
}

exports.get_last_user_password = async (fields) =>
{
  usersModel.condition = { username : fields.username }
  const user_data = await usersModel.get_all()

  if (user_data.length === 0) throw Exception.setError("this user is not exist")

  last_passwordModel.condition = { user_id : user_data[0].id } 
  if (await last_passwordModel.counts() === 0) throw Exception.setError("this user dosent have last password")
  const last_pass = await last_passwordModel.select()
  return {
    status: true,
    last_password: last_pass[0].password,
    token: await JWT.sign({
      id: user_data[0].id.toString(),
      role: user_data[0].role,
      username: user_data[0].username
    })
  }

}