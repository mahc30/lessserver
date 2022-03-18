const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')

module.exports.handler = async function(event, context) {
    const { id } = event.pathParameters;

    const result = await dynamoDB.get({
        TableName: TABLENAME,
        Key: {
            id
        }
    }).promise();

    const client = result.Item
    if (!client) return { status: 204 }
    return {
        status: 200,
        body: client
    }
}