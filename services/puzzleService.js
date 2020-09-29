const AWS = require('aws-sdk');
const PuzzleModel = require('../models/puzzleModel');

class PuzzleService {
    constructor(dynamodb, ddbDocumentClient) {
        if (!!dynamodb) {
            this.dynamodb = dynamodb;
        }
        else {
            this.dynamodb = new AWS.DynamoDB();
        }
        if (!!ddbDocumentClient) {
            this.ddbDocumentClient = ddbDocumentClient;
        }
        else {
            this.ddbDocumentClient = new AWS.DynamoDB.DocumentClient();
        }
        this._tableName = 'Puzzle';
        this._puzzleTableParams = {
            TableName : this._tableName,
            KeySchema : [
                { AttributeName: 'owner', KeyType: 'HASH' },
                { AttributeName: 'name', KeyType: 'RANGE' }
            ],
            AttributeDefinitions: [
                { AttributeName: 'owner', AttributeType: 'S' },
                { AttributeName: 'name', AttributeType: 'S' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
    }
    async getPuzzle(puzzleName, userId) {
        let params = {
            TableName: this._tableName,
            Key: {
                "owner": userId,
                "name": puzzleName
            }
        }
        try {
            let result = await this.ddbDocumentClient.get(params).promise();
            return result.Item;
        }
        catch (err) {
            console.error("Error JSON.", JSON.stringify(err, null, 2));
        }
    }

    async listAsync(userId) {
        // "owner" is a reserved keywoard
        // https://dynobase.dev/dynamodb-errors/validationexception-invalid-keyconditionexpression-attribute-name-is-a-reserved-keyword/
        let params = {
            KeyConditionExpression: '#puzzle_owner = :owner',
            ExpressionAttributeValues: {
                ':owner': userId
            },
            TableName: this._tableName,
            ExpressionAttributeNames: { '#puzzle_owner': 'owner' }
        };
        try {
            let result = await this.ddbDocumentClient.query(params).promise();
            return result.Items;
        }
        catch (err) {
            console.error("Error JSON.", JSON.stringify(err, null, 2));
        }
    }
    
    async putItemAsync(puzzleModel) {
        let params = puzzleModel.toParams();
        // ToDo: Manage logging using winston
        try {
            let response = await this.dynamodb.putItem(params).promise();
            console.log("Created data.", JSON.stringify(response, null, 2));
        }
        catch (err) {
            console.error("Error JSON.", JSON.stringify(err, null, 2));
        }
    }

    async createPuzzleTableAsync() {
        // ToDo: Manage logging using winston
        try {
            let response = await this.dynamodb.createTable(this._puzzleTableParams).promise();
            console.log('created table.', JSON.stringify(response, null, 2));
        }
        catch (err) {
            console.error('Error JSON.', JSON.stringify(err, null, 2));
        }
    }
}

module.exports = PuzzleService;