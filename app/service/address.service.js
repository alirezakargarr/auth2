const Exception = require('../utils/error.utility');
const axios = require("axios");

module.exports = class get_address_with_lat_long {
  constructor() {
    this.result = ""
    this.error = ""
  }

  async get_address_with_lat_long({lat, lon})
  {
    const axiosHeader = await axios.create({
      headers: {
        "x-api-key": process.env.ADDRESS_TOKEN
      }
    })

    await axiosHeader.get(`https://map.ir/reverse?lat=${lat}&lon=${lon}`)
        .then((res) => {
          this.result = {
            status: true,
            data: res.data
          }
        })
        .catch((e) => {
          this.error = {
            status: false
          }
        })

    return this.error || this.result
  }
}
