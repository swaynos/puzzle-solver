const express = require('express');
const auth = require('../auth');
const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  testCode();
  // const { userContext } = req; // ToDo: Remove
  res.render('index');
});

function testCode() {
  // ##### ToDo: Test code
  const AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({
    region: 'local',
    endpoint: 'http://dynamodb-local:8000'
  //   accessKeyId: "any", //process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: "any" //process.env.AWS_SECRET_ACCESS_KEY
  });

  // Create the DynamoDB service object
  let dynamodb = new AWS.DynamoDB();
  dynamodb.listTables({Limit: 10}, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table names are ", data.TableNames);
    }
  });
  // ##### End Test Code
}

module.exports = router;