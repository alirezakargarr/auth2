const Model = require("./../system/Model")
const { session : session_model } = require('../sequelize_models/index')

class session extends Model {
  constructor() {
    super()
    this.table = "session"
    this.columns = ""
    this.limit = ""
    this.condition = ""
    this.question_marks = ""
    this.sqz_model = session_model
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
    this.destroy = async () => {
      return await this.delete()
    }
  }
}

module.exports = new session()