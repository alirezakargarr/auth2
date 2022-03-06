const Sequelize = require('sequelize')

const db = require('../config/db')

const users = db.define('users' , {
    id : {
        type: Sequelize.UUID ,
        allowNull: false ,
        primaryKey: true
    } ,
    company_name : {
        type: Sequelize.TEXT
    } ,
    economic_code : {
        type: Sequelize.TEXT
    } ,
    email : {
        type: Sequelize.TEXT
    } ,
    national_code : {
        type: Sequelize.TEXT
    } ,
    national_id : {
        type: Sequelize.TEXT
    } ,
    password : {
        type: Sequelize.TEXT
    } ,
    phone_number : {
        type: Sequelize.TEXT
    } ,
    registration_id : {
        type: Sequelize.TEXT
    } ,
    role : {
        type: Sequelize.TEXT
    } ,
    service: {
        type: Sequelize.TEXT
    } ,
    username: {
        type: Sequelize.TEXT
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    facebook: {
        type: Sequelize.TEXT
    },
    twitter: {
        type: Sequelize.TEXT
    },
    linkedIn: {
        type: Sequelize.TEXT
    },
    youtube: {
        type: Sequelize.TEXT
    },
    aparat: {
        type: Sequelize.TEXT
    },
    instagram: {
        type: Sequelize.TEXT
    },
    telegram: {
        type: Sequelize.TEXT
    },
    user_service_role: {
        type: Sequelize.TEXT
    },
    configurations: {
        type: Sequelize.JSON
    },
    name: {
        type: Sequelize.TEXT
    },
    family_name: {
        type: Sequelize.TEXT
    },
    birthday: {
        type: Sequelize.TEXT
    },
    gender: {
        type: Sequelize.TEXT
    },
    job: {
        type: Sequelize.TEXT
    },
    city_state: {
        type: Sequelize.TEXT
    },
    telephone_number: {
        type: Sequelize.TEXT
    },
    field_of_activity: {
        type: Sequelize.TEXT
    },
    address: {
        type: Sequelize.JSON
    },
    packet_id: {
        type: Sequelize.JSON
    },
    wallet_id: {
        type: Sequelize.JSON
    }
  }
)

module.exports = users