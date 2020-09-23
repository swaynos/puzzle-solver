const PuzzleService = require("../services/puzzleService");

class PuzzleModel {
    constructor(owner, name, numberOfPieces) {
        this.owner = owner;
        this.name = name;
        this.numberOfPieces = numberOfPieces;
    }

    toParams() {
        return {
            TableName: PuzzleModel.tableName,
            Item: {
                owner : {S: this.owner},
                name : {S: this.name},
                numberOfPieces : {N: this.numberOfPieces.toString()}
            }
        }
    }
}

// Static members
PuzzleModel.tableName = 'Puzzle';

module.exports = PuzzleModel;