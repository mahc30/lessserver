const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')

module.exports.handler = async function(event, context) {
    const result = await dynamoDB.scan({
        TableName: TABLENAME
    }).promise();

    const clients = result.Items;

    if (clients.length === 0) return { status: 204 }
    return {
        status: 200,
        body: { clients }
    }
}