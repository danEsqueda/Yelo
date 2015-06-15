'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var PersistentResource = require('./persistent-resource');

var app = express();
app.use(express.static('www'));

var mongoURL = 'mongodb://localhost:27017';
var Board = require('./Board')(app, mongoURL, 'yelo');
var Column = require('./Column')(app, mongoURL, 'yelo');
var User = require('./User')(app, mongoURL, 'yelo');
var Card = require('./Card')(app, mongoURL, 'yelo');

var port = 3000;
app.listen(port, function() {
  console.log('Listening on :' + port + '.');
});
