const PuzzleModel = require('../models/puzzleModel');
const PuzzleService = require('../services/puzzleService');
const AWS = require('aws-sdk');

const deploy = async () => {
    const dynamodb = new AWS.DynamoDB();
    const service = new PuzzleService(dynamodb);

    let puzzleTableItem = new PuzzleModel('me', 'Foobar', 7);

    await service.createPuzzleTableAsync();
    await service.putItemAsync(puzzleTableItem);
}
exports.deploy = deploy;