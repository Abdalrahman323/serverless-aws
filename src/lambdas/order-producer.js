const { v4: uuid } = require('uuid')
const apiResponse = require('../util/api-res')
const sqsService = require('../services/sqs-services')
module.exports.handler = async (event, context, cb) => {
    const { body = {} } = event;

    const { name = '', amount = 0 } = JSON.parse(body);
    const id= uuid();
    const order = {
        id,
        name,
        amount,
        createdAt: Date.now()
    }

    try {
        const queueUrl = process.env.ordersQueue
        await sqsService.sendMessage(queueUrl ,JSON.stringify(order))
        return cb(null, apiResponse.ok({ message: 'success', id }));
    }
    catch (e) {
        console.log(e);
        return cb(null, apiResponse.serverError({ message: 'Failed to create order' }))
    }



}