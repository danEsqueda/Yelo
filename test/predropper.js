'use strict';

var DATABASE;
if (process.argv.length < 3) {
  console.error("Usage:\tnode test/preloader DATABASE");
  process.exit(0);
} else {
  DATABASE = process.argv[2];
}

var express = require('express');
var app = express();

var ObjectID = require('mongoose').Schema.Types.ObjectId;
var MONGO = 'mongodb://localhost:27017';
var User = require('../src/server/User')(app, MONGO, DATABASE);
var Card = require('../src/server/Card')(app, MONGO, DATABASE);
var Column = require('../src/server/Column')(app, MONGO, DATABASE);
var Board = require('../src/server/Board')(app, MONGO, DATABASE);

User.dropAll(function(err) {
  console.log('Dropped all Users');
  Card.dropAll(function(err) {
    console.log('Dropped all Cards');
    Column.dropAll(function(err) {
      console.log('Dropped all Column');
      Board.dropAll(function(err) {
        console.log('Dropped all Boards');
        disconnect();
      });
    });
  });
});

function disconnect() {
  User.disconnect(function() {
    Card.disconnect(function() {
      Column.disconnect(function() {
        Board.disconnect(function() {
          console.log('Disconnected from MongoDB');
        });
      });
    });
  });
}
