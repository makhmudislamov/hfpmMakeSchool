const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// ROUTES
const indexRouter = require('./routes/index');
const funds = require('./routes/hedgeFunds');
const auth = require('./routes/auth')

const app = express();

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hfpm', { useNewUrlParser: true });
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

// app.use('/', indexRouter);
indexRouter(app);
funds(app);
auth(app);

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 3000!')
});



module.exports = app;