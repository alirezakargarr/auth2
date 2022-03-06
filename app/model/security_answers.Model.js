const Model = require("./../system/Model")
const { security_answers : s_answers_model } = require('../sequelize_models/index')

class security_answers extends Model {
  constructor() {
    super()
    this.table = "security_answers"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = s_answers_model
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

module.exports = new security_answers()