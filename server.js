const port = process.env.PORT || 3009
const log = require('./app/utils/log.utility');
const cron = require('node-cron');
const sequelize = require("./app/config/db");
const disposable_code_service = require("./app/service/disposable_code.service");
const client = require("./app/utils/redis.utility");

client.on('connect', function() {
  console.log('redis Connected!');
});


// 0 1-59/1 * * * *
// */2 * * * * *
sequelize.sync()
cron.schedule('*/10 * * * * *', async () => {
  log.info('------ per 10 sec -------');
  disposable_code_service.check_for_expire(
      await disposable_code_service.get_all_valide_codes()
  )
})

require("./app").listen(port, () => {
  // log.info(`Server running on port: ${port}`)
  console.log(`Server running on port: ${port}`)
})
