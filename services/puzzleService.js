const AWS = require('aws-sdk');
const PuzzleModel = require('../models/puzzleModel');

class PuzzleService {
    constructor(dynamodb) {
        this.dynamodb = dynamodb;
        this._puzzleTableParams = {
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
    }

    async list(user) {
        let model = new PuzzleModel();
        return [
            model
        ];
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