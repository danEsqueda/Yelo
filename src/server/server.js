'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var PersistentResource = require('./persistent-resource');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

var mongoURL = 'mongodb://localhost:27017';
var Board = require('./Board')(app, mongoURL, 'yelo', function(err) { });
var Column = require('./Column')(app, mongoURL, 'yelo', function(err) { });
var User = require('./User')(app, mongoURL, 'yelo', function(err) { });
var Card = require('./Card')(app, mongoURL, 'yelo', function(err) { });

var port = 3000;
app.listen(port, function() {
  console.log('Listening on :' + port + '.');
});
