const Model = require("./../system/Model")
const { users : users_model } = require('../sequelize_models/index')

class login extends Model {
  constructor() {
    super()
    this.table = "users"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = users_model
    this.select = async () => {
      return await this.get()
    }
    this.save = async (params) => {
      return await this.add(params)
    }
    this.update_items = async (params) => {
      return await this.update(params)
    }
    this.count_all = async () => {
      return await this.count()
    }
  }
}

module.exports = new login()