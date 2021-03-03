const aws = require('aws-sdk');

const documentClient = new aws.DynamoDB.DocumentClient();

const write = async (data, tableName) => {
        const params={
            TableName: tableName,
            Item :data,
        }
    const result = await documentClient.put(params).promise();

    if(!result){
        throw new Error(`unable to write to dynamo table ${tableName}`)
    }
    return result;
}


module.exports ={
    write
}