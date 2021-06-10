var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sess = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const passport = require('passport')
const Pusher = require("pusher");
require('./config/passport')(passport)


var app = express();
const pusher = new Pusher({
  appId: "1217523",
  key: "25eeb555ab462da5c3f9",
  secret: "3d7c63b3a30dc71b9656",
  cluster: "mt1",
  useTLS: true
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json)

app.use(sess({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);


const connection_url = 'mongodb+srv://ursula:ursula6006@cluster0.4qy1m.mongodb.net/ursula1?retryWrites=true&w=majority'

mongoose.connect(connection_url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(console.log('mongodb connected'))
  .catch(err => console.log(err))


mongoose.connection.once('open', () => {
	console.log('db connected')
  const urs = mongoose.connection.collection('User')
  const changeStream = urs.watch()

  changeStream.on('change', (change) =>{
		console.log(change)
  })

})



  // pusher.trigger("my-channel", "my-event", {
  //   message: "hello world"
  // });
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
