require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var router = require('./routes/index');

const models = require('./models/models');
const ApiError = require('./errors/ApiError');
const errorHandler = require('./middleweare/ErrorHandlingMiddleweare');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use('/devices', express.static(`${__dirname}/public/images/devices`));
app.use('/brands', express.static(`${__dirname}/public/images/brands`));
app.use('/profiles', express.static(`${__dirname}/public/images/profiles`));
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;