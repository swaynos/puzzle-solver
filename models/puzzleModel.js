const PuzzleService = require("../services/puzzleService");

class PuzzleModel {
    constructor(owner, name, numberOfPieces) {
        this.id = null;
        this.owner = owner;
        this.name = name;
        this.numberOfPieces = numberOfPieces;
    }

    toParams() {
        return {
            TableName: PuzzleModel.tableName,
            Item: {
                id: {N: this.id.toString()},
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