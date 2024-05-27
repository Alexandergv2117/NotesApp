const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const { TABLES_NAMES } = require('../constants/tablesName')

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const requestBody = event.body ? JSON.parse(event.body) : {}

  const { title = '', command = '', description = '' } = requestBody

  if (!title || !command || !description) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' })
    }
  }

  const newCommand = {
    id: v4(),
    title,
    command,
    description,
    createdAt: new Date().toISOString()
  }

  try {
    await dynamodb.put({
      TableName: TABLES_NAMES.COMMAND,
      Item: newCommand
    }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(newCommand)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Error creating command' })
    }
  }
}
