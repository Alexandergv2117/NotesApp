const AWS = require('aws-sdk')

const { TABLES_NAMES } = require('../constants/tablesName')

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const id = event.pathParameters.id ? event.pathParameters.id : null

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Id commands is required' })
    }
  }

  try {
    const command = await dynamodb.get({
      TableName: TABLES_NAMES.COMMAND,
      Key: { id }
    }).promise()

    if (!command.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Command not found' })
      }
    }

    await dynamodb.delete({
      TableName: TABLES_NAMES.COMMAND,
      Key: { id }
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Command deleted' })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error deleting command' })
    }
  }
}
