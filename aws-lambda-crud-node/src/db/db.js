const AWS = require('aws-sdk')
exports.dynamoDB = new AWS.DynamoDB.DocumentClient();