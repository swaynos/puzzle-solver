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
const puzzleTableItem = {
    TableName: 'Puzzle',
    Item: {
        id: {N: '1'},
        owner : {S: 'me'},
        name : {S: 'Foobar'},
        numberOfPieces : {N: '7'},
    }
};

const deploy = () => {
    // Create the DynamoDB service object
    let dynamodb = new AWS.DynamoDB();

    console.log('creating table');
    let puzzleTablePromise = createTable(dynamodb, puzzleTableParams);

    puzzleTablePromise.then(() => {
        putItem(dynamodb, puzzleTableItem);
    });
}

function createTable(dynamodb, params) {
    // ToDo: Manage logging using winston
    let createTablePromise = dynamodb.createTable(params).promise();
    createTablePromise.then((data) => {
        console.log('created table.', JSON.stringify(data, null, 2));
    }).catch(function(err) {
        consolellog.error('Error JSON.', JSON.stringify(err, null, 2));
    });
    return createTablePromise;
}

function putItem(dynamodb, params) {
    let putItemPromise = dynamodb.putItem(params).promise();
    putItemPromise.then((data) => {
        console.log("Created data.", JSON.stringify(data, null, 2));
    }).catch(function(err) {
        console.error("Error JSON.", JSON.stringify(err, null, 2));
    });
    return putItemPromise;
}
exports.deploy = deploy;