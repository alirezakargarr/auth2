const Sequelize = require('sequelize')

const db = require('../config/db')

const disposable_code = db.define('disposable_code' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    } ,
    code : {
        type: Sequelize.INTEGER
    } ,
    date : {
        type: Sequelize.TEXT
    } ,
    hour  : {   
        type: Sequelize.TEXT
    } ,
    status : {
        type: Sequelize.BOOLEAN 
    } ,
    user_id: {
        type: Sequelize.UUID
    }
  }
)


module.exports = disposable_code