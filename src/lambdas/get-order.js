const apiResponse = require('../util/api-res')
const fakeOrders = {
    1: { name: 'mohammed', total: 120, createdAt: '2021-02-03' },
    2: { name: 'ahmed', total: 10, createdAt: '2021-02-03' },
    3: { name: 'ismail', total: 140, createdAt: '2021-02-03' },
    4: { name: 'fawzy', total: 170, createdAt: '2021-02-03' },
    5: { name: 'salah', total: 1780, createdAt: '2021-02-03' },
    6: { name: 'ayman', total: 1790, createdAt: '2021-02-03' },
}

module.exports.handler = (event, context, cb) => {
    const { pathParameters } = event;
    if (!pathParameters) {
        // return error
        return cb(null, apiResponse.badRequest({message: 'Missing order id'}))
    }
    const { id } = pathParameters;

    if (!fakeOrders[id]) {
        // return unfound
        return cb(null, apiResponse.notFound({message: `order ${id} not found`}))

    }

    // return order
    return cb(null, apiResponse.ok({message: 'success',order:fakeOrders[id]}));

}