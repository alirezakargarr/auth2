const db = require("./../config/db");

module.exports = class Model {
    constructor() {
        this.table = "";
        this.question_marks = "";
        this.columns = "";
        this.error = "";
        this.result = "";
        this.order_by = "";
        this.condition = "";
        this.limit = "";
        this.sqz_model = null;
    }

    optionsGenerator(method) {
        if(method === 'full') {
            if (this.condition)
            {
                return {
                    where : this.condition ,
                }
            }
            if (this.order_by)
            {
                return {
                    where : this.condition ,
                    order : this.order_by ,
                }
            }
            if (this.limit)
            {
                return {
                    where : this.condition ,
                    order : this.order_by ,
                    limit : this.limit
                }
            }
        }
        else {
            return {
                where : this.condition 
            }
        }       
    }

    async get() {
        await this.sqz_model.findAll(this.optionsGenerator('full'))
            .catch(e => {
                this.error = e
            })
            .then(instances => {
                this.result = instances
            })
        return this.error || this.result
    }

    async add(params) {
        // var query = `INSERT INTO ${this.table} JSON "${JSON.stringify(params)}" `;
        // await db.query(query)
        await this.sqz_model.create(params)
            .catch((e) => {
                console.log(e)
                this.error = e
            })
            .then(res => {
                this.result = res
            })
        return this.error || {status: true}
    }

    async update(values) {
        this.sqz_model.update(values , this.optionsGenerator())
            .catch((e) => {
                this.error = e
            })
            .then( res => {
                this.result = res
            })
        return this.error || { status: true }
    }

    async delete()
    {
        await this.sqz_model.destroy(this.optionsGenerator())
            .catch((e) => {
                this.error = e
            })
            .then(res => {
                this.result = res
            })
        return this.error || { status: true }
    }

    async count()
    {
        await this.sqz_model.count(this.optionsGenerator('full'))
            .catch(e => {
                this.error = e
            })
            .then(instances => {
                this.result = instances
            })
        return this.error || this.result//.rows[0].count.low
    }
}