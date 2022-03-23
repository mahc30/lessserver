const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')
const { v4 } = require('uuid')

module.exports.handler = async function(event, context) {
    let insertedClients = [];
    for (const record of event.Records) {

        const { nombres, apellidos, tipoDocumento, numeroDocumento, edad, ciudad } = JSON.parse(record.body);
        const createdAt = new Date().toTimeString();
        const id = v4();

        const newClient = {
            id,
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento,
            edad,
            ciudad,
            createdAt
        }

        await dynamoDB.put({
            TableName: TABLENAME,
            Item: newClient
        }).promise();

        insertedClients.push(newClient)
    }

    return {
        status: 200,
        body: JSON.stringify(insertedClients)
    }
}