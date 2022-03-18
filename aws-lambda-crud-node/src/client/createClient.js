const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')
const { v4 } = require('uuid')

module.exports.handler = async function(event, context) {
    const { nombres, apellidos, tipoDocumento, numeroDocumento, edad, ciudad } = JSON.parse(event.body);
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

    return {
        status: 200,
        body: JSON.stringify(newClient)
    }
}