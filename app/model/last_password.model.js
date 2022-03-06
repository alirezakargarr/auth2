const Model = require("./../system/Model")
const { last_password : last_pass_model } = require('../sequelize_models/index')

class last_password extends Model {
  constructor() {
    super()
    this.table = "last_password"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = last_pass_model
    this.select = async () => {
      return await this.get()
    }
    this.save = async (params) => {
      return await this.add(params)
    }
    this.update_items = async (params) => {
      return await this.update(params)
    }
    this.counts = async () => {
      return await this.count()
    }
  }
}

module.exports = new last_password()