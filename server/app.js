var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
var mongoose = require('mongoose');  // module for easy MongoDB connection
var db = require('./db');

var indexRouter = require('./routes/index');
var userRouter  = require('./routes/api/user')
var adminRouter = require('./routes/api/admin');
var adminUI = require('./views/ui-requests');

var app = express();

//NOTE: Disabled the views part since from my understanding 
// the server just needs to serve data

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// database connection
mongoose.connect(db.mongo_port, {useNewUrlParser: true})
  .then(() => console.log("Succesfully connected to DB."))
  .catch(err => console.log("Error while connecting to db:\n" + err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes to use
app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/', userRouter);
app.use('/admin', adminUI);
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
