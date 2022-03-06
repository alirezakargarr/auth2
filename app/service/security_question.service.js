const Exception = require('../utils/error.utility');
const _ = require("lodash")
const login_service = require("../service/login.service");
const security_questionsModel = require("../model/security_questions.model");
const security_answersModel = require("../model/security_answers.Model");
const { v4: uuidv4 } = require('uuid');

exports.checking_security_questions = async (fields) =>
{
  const sq = JSON.parse(fields.answers)
  // console.log(sq['what is your favorite movie?'])
  const security_questions = await security_questionsModel.select()
  const client_security_questions = _.keys(sq)
  var security_questions_keys = []

  for (i = 0; i < security_questions.length; i++)
  {
    security_questions_keys.push(security_questions[i].question)
  }
  if(client_security_questions.sort().join(',') !== security_questions_keys.sort().join(','))
  {
    throw Exception.setError("your security question does not match")
  }
  else return true

}

exports.save_security_answers = async (fields, user_info) =>
{
  security_answersModel.condition = { user_id : user_info.id } 
  console.log(await security_answersModel.counts())
  if (await security_answersModel.counts() === 0)
  {
    // insert
    fields.id = uuidv4()
    fields.user_id = user_info.id
    return await security_answersModel.save(fields)
  }
  security_answersModel.condition = { user_id : user_info.id } 
  const se = await security_answersModel.select()
  security_answersModel.condition = { id : se[0].id }
  return await security_answersModel.update_items({ answers : fields.answers })
}

exports.check_answers = async (fields, user_info) =>
{
  security_answersModel.condition = { user_id : user_info.id }
  console.log(await security_answersModel.counts())
  if (await security_answersModel.counts() === 0)
    return false
  const answers = await security_answersModel.select()

  var db_answer = "";
  var user_answer = "";
  var keys = JSON.parse(answers[0].answers)
  db_answer = keys[fields.question]
  user_answer = fields.answer

  // return console.log(user_answer+ " "+db_answer)
  // for (i = 0; i <= answers.length; i++)
  // {
  //   if (fields[_.keys(JSON.parse(answers[0].answers))[i]]) {
  //     // console.log(fields[_.keys(JSON.parse(answers[0].answers))[i]])
  //     console.log(JSON.parse(answers[0].answers)[_.keys(JSON.parse(answers[i].answers))[i]]);
  //     // console.log([_.keys(JSON.parse(answers[i].answers))[i]]);
  //     // console.log( _.keys(JSON.parse(answers[i].answers))[i] );
  //     db_answer = fields[_.keys(JSON.parse(answers[0].answers))[i]]
  //     user_answer = JSON.parse(answers[0].answers)[_.keys(JSON.parse(answers[i].answers))[i]]
  //
  //   }
  // }

  if (db_answer === user_answer)
  {
    return await login_service.login_without_pass(fields)
  } else return false
}