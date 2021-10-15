const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(compression()); // 요청받은 내용들 압축해서 파일 용량 줄이기

//CORS
const cors = require('cors');
const corsOptions = {
  //cors설정
  origin: '*', //전체 허용
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,

  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const indexRouter = require('./routes/index');

// mongo DB connect
try {
  mongoose.connect(
    `mongodb://${process.env.USER_ID}:${process.env.PASSWORD}@${process.env.HOST}:27017/${process.env.DATABASE}?authSource=admin`
  );
} catch (error) {
  console.log('mongo connect error : ', error);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

module.exports = app;
