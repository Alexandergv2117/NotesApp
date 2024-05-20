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

  const requestBody = event.body ? JSON.parse(event.body) : {}

  const { title = '', command = '', description = '', tag = '' } = requestBody

  try {
    const existCommand = await dynamodb.get({
      TableName: TABLES_NAMES.COMMAND,
      Key: { id }
    }).promise()

    if (!existCommand.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Command not found' })
      }
    }

    const update = await dynamodb.update({
      TableName: TABLES_NAMES.COMMAND,
      Key: { id },
      UpdateExpression: 'SET title = :title, command = :command, description = :description, tag = :tag, updatedAt = :updatedAt, createdAt = :createdAt',
      ExpressionAttributeValues: {
        ':title': title || existCommand.Item.title,
        ':command': command || existCommand.Item.command,
        ':description': description || existCommand.Item.description,
        ':tag': tag || existCommand.Item.tag,
        ':updatedAt': new Date().toISOString(),
        ':createdAt': existCommand.Item.createdAt || new Date().toISOString()
      }
    }).promise()

    if (!update) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Error updating command' })
      }
    }

    const commandUpdate = await dynamodb.get({
      TableName: TABLES_NAMES.COMMAND,
      Key: { id }
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(commandUpdate)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error getting command' })
    }
  }
}
