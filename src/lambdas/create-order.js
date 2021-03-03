const { v4: uuid } = require('uuid')
const apiResponse = require('../util/api-res')
const dynamoService = require('../services/dynamo-service')

module.exports.handler = async (event, context, cb) => {
    const { body = {} } = event;

    const { name = '', amount = 0 } = JSON.parse(body);
    const order = {
        id: uuid(),
        name,
        amount,
        createdAt: Date.now()
    }

    try {
        const tableName = process.env.orderTableName;
        console.log("tableName "+ tableName);
        const data = await dynamoService.write(order , tableName);
        return cb(null, apiResponse.ok({ message: 'success', data }));
    }
    catch (e) {
        console.log(e);
        return cb(null, apiResponse.serverError({ message: 'Failed to create order' }))
    }



}