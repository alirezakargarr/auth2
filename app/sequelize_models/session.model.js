const Sequelize = require('sequelize')

const db = require('../config/db')

const session = db.define('last_password' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    } ,
    session_id : {
        type: Sequelize.TEXT
    } ,
    password : {
        type: Sequelize.TEXT
    },
    block_status : {
        type: Sequelize.BOOLEAN
    } ,
    user_id: {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    }
  }
)

module.exports = session