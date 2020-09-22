const PuzzleModel = require('../models/puzzleModel');
const PuzzleService = require('../services/puzzleService');
const AWS = require('aws-sdk');

const deploy = async () => {
    const dynamodb = new AWS.DynamoDB();
    const service = new PuzzleService(dynamodb);

    let puzzleTableItem = new PuzzleModel('me', 'Foobar', 7);

    console.log('creating table');
    await service.createPuzzleTableAsync();
    puzzleTableItem.id = 1;
    await service.putItemAsync(puzzleTableItem);
}
exports.deploy = deploy;