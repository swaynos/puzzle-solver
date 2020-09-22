const PuzzleModel = require('../models/puzzleModel');
const AWS = require('aws-sdk');

const puzzleTableParams = {
    TableName : 'Puzzle',
    KeySchema : [
        { AttributeName: 'id', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'N' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
const puzzleTableItem = new PuzzleModel('me', 'Foobar', 7);

const deploy = async () => {
    // Create the DynamoDB service object
    let dynamodb = new AWS.DynamoDB();

    console.log('creating table');
    await createTableAsync(dynamodb, puzzleTableParams);
    puzzleTableItem.id = 1;
    await putItemAsync(dynamodb, puzzleTableItem.toParams());
}

async function createTableAsync(dynamodb, params) {
    // ToDo: Manage logging using winston
    try {
        let response = await dynamodb.createTable(params).promise();
        console.log('created table.', JSON.stringify(response, null, 2));
    }
    catch (err) {
        console.error('Error JSON.', JSON.stringify(err, null, 2));
    }
}

async function putItemAsync(dynamodb, params) {
    try {
        let response = await dynamodb.putItem(params).promise();
        console.log("Created data.", JSON.stringify(response, null, 2));
    }
    catch (err) {
        console.error("Error JSON.", JSON.stringify(err, null, 2));
    }
}
exports.deploy = deploy;