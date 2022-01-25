const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const TABLENAME = 'ClientsTable';
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const createClient = async (e) => {

  const { nombres, apellidos, tipoDocumento, numeroDocumento, edad, ciudad } = JSON.parse(e.body);
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

const listAllClient = async (e) => {
  const result = await dynamoDB.scan({
    TableName: TABLENAME,

  }).promise();

  const clients = result.Items;


  if (clients.length === 0) return { status: 204 }
  return {
    status: 200,
    body: { clients }
  }
}

const getClient = async (e) => {
  const { id } = e.pathParameters;

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

const updateClient = async (e) => {
  const { id } = e.pathParameters;

  const {
    nombres,
    apellidos,
    tipoDocumento,
    numeroDocumento,
    edad,
    ciudad
  } = JSON.parse(e.body);

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

const deleteClient = async (e) => {
  const { id } = e.pathParameters;

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

module.exports = {
  createClient,
  listAllClient,
  getClient,
  updateClient,
  deleteClient
};
