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

var Q = require('q');

var users = [
{
  fullName: 'Jeff Lebowski',
  userName: 'dude',
  email: 'jeff@example.com',
  password: 'dude',
  photoURL: '',
  session: '',
},
{
  fullName: 'Alec Hollingsworth',
  userName: 'alecroy',
  email: 'alec@example.com',
  password: 'alec',
  photoURL: '',
  session: '',
},
{
  fullName: 'Nick Peters',
  userName: 'nickp',
  email: 'nick@example.com',
  password: 'nick',
  photoURL: '',
  session: '',
},
{
  fullName: 'Daniel Esqueda',
  userName: 'dan',
  email: 'dan@example.com',
  password: 'dan',
  photoURL: '',
  session: '',
},
{
  fullName: 'Kendall Comey',
  userName: 'kcomey',
  email: 'kendall@example.com',
  password: 'kendall',
  photoURL: '',
  session: '',
},
{
  fullName: 'Jonnnny Ringvald',
  userName: 'jvald',
  email: 'jon@example.com',
  password: 'jon',
  photoURL: '',
  session: '',
},
];

var cards = [
{
  name: 'card numero uno',
  content: 'first card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
{
  name: 'card numero dos',
  content: 'second card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
{
  name: 'card numero tres',
  content: 'third card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
{
  name: 'card numero cuatro',
  content: 'fourth card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
{
  name: 'card numero cinco',
  content: 'fifth card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
{
  name: 'card numero seis',
  content: 'sixth card',
  colors: ['#ffffff'],
  comments: ['card comment'],
  users: [],
},
];

var columns = [
{
  name: 'Column #1',
  cards: [],
},
{
  name: 'Column #2',
  cards: [],
},
{
  name: 'Column #3',
  cards: [],
},
{
  name: 'Column #4',
  cards: [],
},
{
  name: 'Column #5',
  cards: [],
},
{
  name: 'Column #6',
  cards: [],
},
];

var boards = [
{
  name: 'Board #1',
  columns: [],
  users: [],
  colors: ["#ffffff"],
},
{
  name: 'Board #2',
  columns: [],
  users: [],
  colors: ["#ffffff"],
},
{
  name: 'Board #3',
  columns: [],
  users: [],
  colors: ["#ffffff"],
},
];

function createUsers(users, callback) {
  var QreateUser = Q.nbind(User.create, User);
  Q.all(users.map(function(user) { return QreateUser(user); }))
  .then(function(docs) {
    console.log('Created users', docs.map(function(u) { return u.fullName; }));
    callback(null, docs);
  });
}

function createCards(cards, callback) {
  var QreateCard = Q.nbind(Card.create, Card);
  Q.all(cards.map(function(card) { return QreateCard(card); }))
  .then(function(docs) {
    console.log('Created cards', docs.map(function(c) { return c.name; }));
    callback(null, docs);
  });
}

function createColumns(columns, callback) {
  var QreateColumn = Q.nbind(Column.create, Column);
  Q.all(columns.map(function(column) { return QreateColumn(column); }))
  .then(function(docs) {
    console.log('Created Columns', docs.map(function(c) { return c.name; }));
    callback(null, docs);
  });
}

function createBoards(boards, callback) {
  var QreateBoard = Q.nbind(Board.create, Board);
  Q.all(boards.map(function(board) { return QreateBoard(board); }))
  .then(function(docs) {
    console.log('Created Boards', docs.map(function(b) { return b.name; }));
    callback(null, docs);
  });
}

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

var userIDs;
Q()
.then(function() {
  return Q.nfbind(createUsers)(users);
})
.then(function(userDocs) {
  userIDs = userDocs.map(function(u) { return u._id; });
  cards = cards.map(function(card, index) {
    card.users.unshift(userDocs[index % userDocs.length]._id);
    card.users.unshift(userDocs[(index+1) % userDocs.length]._id);
    return card;
  });
  return Q.nfbind(createCards)(cards);
})
.then(function(cardDocs) {
  columns = columns.map(function(column, index) {
    column.cards.unshift(cardDocs[index]._id);
    return column;
  });
  return Q.nfbind(createColumns)(columns);
})
.then(function(columnDocs) {
  boards = boards.map(function(board, index) {
    board.users = board.users.concat(userIDs);
    board.columns.unshift(columnDocs[index]._id);
    board.columns.unshift(columnDocs[(index+3) % columnDocs.length]._id);
    return board;
  });
  return Q.nfbind(createBoards)(boards);
})
.then(function() {
  disconnect();
});

