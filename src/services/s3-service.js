const aws = require('aws-sdk');
const s3Client = new aws.S3();

const getObject = async (bucket, filename) => {

    const params = {
        Bucket: bucket,
        Key: filename
    }
    const data = await s3Client.getObject(params).promise();

    return data.Body.toString();
}

module.exports = {
    getObject,
}