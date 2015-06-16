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

var QreateUser = Q.nbind(User.create, User);
function createUsers(users) {
  Q
  .all(users.map(function(user) { return QreateUser(user); }))
  .then(function(docs) {
    console.log('then', docs);
  });
  // users.forEach(function(user) {
  //   User.create(user, function(err, doc) {
  //     if (err) {
  //       throw new Error(err);
  //     } else {
  //       console.log('Created User: ', user.fullName);
  //     }
  //   })
  // })
}

createUsers(users);
setTimeout(disconnect, 5000);

// var hash = {
//   name: 'this is a card',
//   content: 'card content',
//   colors: ['#ffffff'],
//   comments: ['first post'],
//   users: [userID],
// };
// Card.create(hash, function(err, doc) {
//   if (err) console.error(err);
//   expect(err).to.be.null;
//   expect(doc).to.not.be.null;

//   cardID = doc._id;

//   Card.get(doc._id, function(err, doc) {
//     expect(err).to.be.null;
//     expect(doc).to.not.be.null;
//     done();
//   });
// });



// var hash = {
//   name: 'Todo List',
//   cards: [cardID],
// };
// Column.create(hash, function(err, doc) {
//   expect(err).to.be.null;
//   expect(doc).to.not.be.null;

//   columnID = doc._id;
//   done();
// });



// var hash = {
//   name: 'Board-o-rama',
//   columns: [columnID],
//   users: [userID],
//   colors: ["#ffffff"],
// };
// Board.create(hash, function(err, doc) {
//   expect(err).to.be.null;
//   expect(doc).to.not.be.null;

//   done();
// })

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
