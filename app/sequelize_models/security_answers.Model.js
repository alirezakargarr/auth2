const Sequelize = require('sequelize')

const db = require('../config/db')

const security_answers = db.define('security_answers' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    } ,
    answers : {
        type: Sequelize.TEXT
    } ,
    user_id: {
        type: Sequelize.UUID
    }
  }
)

module.exports = security_answers