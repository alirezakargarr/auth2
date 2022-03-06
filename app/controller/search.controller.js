const response = require("../utils/response.utitlity")
const validate = require("../validations/search.validate")
const searchService = require("./../service/search.service")

exports.search = async (req, res) => {
    try {
        // validate.header(req.headers)
        // validate.search(req.fields)
        // let headers = JSON.parse(req.headers.service)
        // if ( headers.length >= 2 ) {
        //     return response.exception(res, "Services array must have at length of 1 at most")
        // }

        req.fields.service = req.headers.service
        // req.fields.configurations = JSON.parse(req.fields.configurations)
        var result = await searchService.search(req.fields)
        response.success(res, result)
    } catch (err) {
        return response.exception(res, err.message);
    }
}