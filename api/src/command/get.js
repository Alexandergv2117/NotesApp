const AWS = require("aws-sdk");

const { TABLES_NAMES } = require("../constants/tablesName");

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    const Commnds = await dynamodb.scan({
      TableName: TABLES_NAMES.COMMAND,
    }).promise();
  
    if (Commnds.Items.length <= 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No commands found" }),
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify(Commnds.Items),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error getting commands" }),
    };
  }
};
