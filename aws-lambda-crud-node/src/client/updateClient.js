const { dynamoDB } = require('../db/db')
const { TABLENAME } = require('../constants')

module.exports.handler = async function(event, context) {

    const { id } = event.pathParameters;

    const {
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        edad,
        ciudad
    } = JSON.parse(event.body);

    const result = await dynamoDB.update({
        TableName: TABLENAME,
        Key: { id: id },
        UpdateExpression: 'SET nombres = :nombres, apellidos = :apellidos, tipoDocumento = :tipoDocumento, numeroDocumento = :numeroDocumento, edad = :edad, ciudad = :ciudad',
        ExpressionAttributeValues: {
            ":nombres": nombres,
            ":apellidos": apellidos,
            ":tipoDocumento": tipoDocumento,
            ":numeroDocumento": numeroDocumento,
            ":edad": edad,
            ":ciudad": ciudad
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    const updated = result.Attributes;

    return {
        status: 200,
        body: { updated }
    }
}