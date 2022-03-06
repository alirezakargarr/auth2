const Model = require("./../system/Model")
const { security_questions : s_questions_model } = require('../sequelize_models/index')

class security_questions extends Model {
  constructor() {
    super()
    this.table = "security_questions"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = s_questions_model
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

module.exports = new security_questions()