var
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    passport = require('passport');

var
    message = require('./class/message');

const
    MESSAGE = require('./class/messages-response'),
    HTTP = require('./class/http-status-codes');

var
    indexRouter = require('./routes/index'),
    privateRouter = require('./routes/private'),
    publicRouter = require('./routes/public');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/private', privateRouter);
app.use('/public', publicRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404).send( new message('global', 'undefined', HTTP.STATUS_NOT_FOUND, MESSAGE.ROUTE_NOT_EXIST, true) );
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
