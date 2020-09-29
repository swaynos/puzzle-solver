const PuzzleModel = require('../models/puzzleModel');
const PuzzleService = require('../services/puzzleService');
const AWS = require('aws-sdk');

const deploy = async () => {
    const dynamodb = new AWS.DynamoDB();
    const service = new PuzzleService(dynamodb);

    let puzzleTableItem = new PuzzleModel('00uufbzr7GHSsHsJF4x6', 'Foobar', 500);

    await service.createPuzzleTableAsync();
    await service.putItemAsync(puzzleTableItem);
}
exports.deploy = deploy;