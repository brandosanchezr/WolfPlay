var createError = require('http-errors');
var flash = require('express-flash');
var express = require('express');
var helmet = require('helmet');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var compression = require('compression');
var cookieParser = require('cookie-parser');


var registerRouter = require('./routes/register');
var forgotRouter = require('./routes/forgot');
var resetRouter = require('./routes/reset');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');

var app = express();

//Set up mongoose connection

var mongoDB =process.env.MONGODB_URI;

mongoose.connect(mongoDB).then(
    () => {  console.log("Conectado a BD web") },
    err => {
        mongoDB = 'mongodb://localhost:27017/wolfplay';
        mongoose.connect(mongoDB);
        console.log('Conectado a la base local');
    }
);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(flash());
app.use(session({
  secret: 'TheDragonDieWithAFireStone',
  resave: true,
  saveUninitialized: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forgot', forgotRouter);
app.use('/register', registerRouter);
app.use('/reset', resetRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
