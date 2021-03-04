const Aws = require('aws-sdk');

const sqsClient = new Aws.SQS();

const sendMessage = async (queueUrl, message, params = {}) => {
    if (typeof message !== 'string') {
        throw new Error("Message is not a string");
    }

    const messageParams = {
        QueueUrl: queueUrl,
        MessageBody: message,
        ...params
    };
    try {

        await sqsClient.sendMessage(messageParams).promise();
    } catch (e) {
        console.log("Faild to send message" , e);
        throw new Error(e);
    }
}

module.exports = {
    sendMessage,
}