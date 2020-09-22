const express = require('express');
const puzzleService = require('../services/puzzleService');

const router = express.Router();

// Display the dashboard page
router.get('/', async (req, res) => {
  let userPuzzles = await puzzleService.list('foo');
  console.log(userPuzzles);
  res.render('puzzle');
});

module.exports = router;