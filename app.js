// import Server from './server.js'

const Server = require('./server');

import webpack from 'webpack';
import path from 'path';
import open from 'open';

import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import graphqlHTTP from 'express-graphql';

// const api = ('../api/index');
// const schema = ('../data/index');
//


import mongoose from 'mongoose';

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost:/property-manager'
mongoose.connect(MONGOURL, err => {
  console.log(err || `Connected to MongoDB at ${MONGOURL}`);
});

const port = (process.env.PORT || 8080);

const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
  console.log('I am a Debug');
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
//
// app.use('/api', api);
//
// app.use('/graphql', graphqlHTTP ({
//   schema:schema,
//   pretty: true,
//   graphql: true
// }))
//
//
// app.get('*', function(req, res) {
//   res.sendFile(path.join( __dirname, '../src/index.html'));
// });

app.listen(port)
console.log(`Listening at http://localhost:${port}`)



// require('dotenv').load();
//
// var Server = require('server');
// var webpack = require('webpack');
//
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var routes = require('./routes/index');
// var users = require('./routes/users');
//
// // var app = express();
// var app = Server.app();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
//
//
// module.exports = app;
