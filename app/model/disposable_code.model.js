const Model = require("./../system/Model")
const { disposable_code : disp_code_model } = require('../sequelize_models/index')

class disposable_code extends Model {
  constructor() {
    super()
    this.table = "disposable_code"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = disp_code_model
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

module.exports = new disposable_code()