const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')

module.exports.handler = async function(event, context) {
    const { id } = event.pathParameters;

    const result = await dynamoDB.delete({
        TableName: TABLENAME,
        Key: { id: id },
        ReturnValues: 'ALL_OLD'
    }).promise();

    const deleted = result.Attributes;

    return {
        status: 200,
        body: { deleted }
    }
}