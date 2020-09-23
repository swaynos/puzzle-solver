const AWS = require('aws-sdk');
const express = require('express');
const PuzzleService = require('../services/puzzleService');

const router = express.Router();

// Display the dashboard page
router.get('/', async (req, res) => {
  // ToDo: How will I manage dependancy injection?
  let dynamodb = new AWS.DynamoDB();
  let service = new PuzzleService(dynamodb);
  let userPuzzles = await service.listAsync('me');
  console.log(userPuzzles);
  res.render('puzzle');
});

module.exports = router;