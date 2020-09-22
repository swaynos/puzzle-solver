const AWS = require('aws-sdk');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
// ToDo: Provide session store https://github.com/expressjs/session/issues/556

const auth = require('./auth');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const puzzleRouter = require('./routes/puzzleController');

// App initialization
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// AWS config
AWS.config.update({
    region: 'local',
    endpoint: 'http://dynamodb-local:8000'
//   accessKeyId: "any", //process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: "any" //process.env.AWS_SECRET_ACCESS_KEY
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(auth.oidc.router);
app.use(auth.addUserToRes);

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/puzzle', auth.oidc.ensureAuthenticated(), puzzleRouter);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Deploy development assets to dynamodb
if (app.get('env') === 'development') {
  require('./scripts/deploy').deploy();
}

module.exports = app;