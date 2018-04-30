var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var hbs = require('hbs');

// Declare the routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var mailRouter =  require('./routes/mail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname , 'views/partials'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'superdupersecretkey'
}))
app.use(flash());
app.use(function(req, res,next){
  res.locals.val_errors = req.flash('val_errors');
  res.locals.register_status = req.flash('register_status');
  res.locals.login_status = req.flash('login_status');
  next();
})
app.use(express.static(path.join(__dirname, 'public')));

// Use routers here
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/mail', mailRouter);

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
