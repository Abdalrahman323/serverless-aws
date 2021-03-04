const dynamoService = require('../services/dynamo-service')

module.exports.handler = (event, context, cb) => {

    const { Records = {} } = event;
    Records.forEach(async item => {
        try {

            const order = JSON.parse(item.body)
            const tableName = process.env.orderTableName;
          await dynamoService.write(order, tableName);
        } catch (e) {
            console.log('Error saving data');
            console.log(e);
        }
    });

}