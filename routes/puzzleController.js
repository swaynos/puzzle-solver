const AWS = require('aws-sdk');
const express = require('express');
const PuzzleService = require('../services/puzzleService');

const router = express.Router();

// Display the dashboard page
router.get('/', async (req, res) => {
  // ToDo: How will I manage dependancy injection?
  let userId = req.userContext.userinfo.sub; // ToDo: Is there a way to fetch this for all requests in one place?
  let dynamodb = new AWS.DynamoDB();
  let service = new PuzzleService(dynamodb);
  let userPuzzles = await service.listAsync(userId);
  res.render('puzzle', {
    puzzles: userPuzzles
  });
});

// Display the edit page
router.get('/edit/:name', async (req, res) => {
  let puzzleName = req.params.name;
  let userId = req.userContext.userinfo.sub; // ToDo: Is there a way to fetch this for all requests in one place?
  let dynamodb = new AWS.DynamoDB();
  let service = new PuzzleService(dynamodb);
  let userPuzzle = await service.getPuzzle(puzzleName, userId);
  res.render('editPuzzle', {
    puzzle: userPuzzle
  })
});

module.exports = router;