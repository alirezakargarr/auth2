const Sequelize = require('sequelize')

const db = require('../config/db')

const last_password = db.define('last_password' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    },
    password : {
        type: Sequelize.TEXT
    },
    user_id: {
        type: Sequelize.UUID
    }
  }
)


module.exports = last_password