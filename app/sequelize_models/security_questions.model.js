const Sequelize = require('sequelize')

const db = require('../config/db')

const security_questions = db.define('security_questions' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    } ,
    question : {
        type: Sequelize.TEXT
    }
  }
)
module.exports = security_questions