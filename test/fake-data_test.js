'use strict';

var chai = require('chai');
var expect = chai.expect;

var express = require('express');
var app = express();

var ObjectID = require('mongoose').Schema.Types.ObjectId;
var MONGO = 'mongodb://localhost:27017';
var User = require('../src/server/User')(app, MONGO, 'yelo_test');
var Card = require('../src/server/Card')(app, MONGO, 'yelo_test');
var Column = require('../src/server/Column')(app, MONGO, 'yelo_test');
var Board = require('../src/server/Board')(app, MONGO, 'yelo_test');

describe('loading fake data', function() {
  var userID;
  var cardID;
  var columnID;

  it('drops all documents in yelo_test', function(done) {
    User.dropAll(function(err) {
      expect(err).to.be.null;
      Card.dropAll(function(err) {
        expect(err).to.be.null;
        Column.dropAll(function(err) {
          expect(err).to.be.null;
          Board.dropAll(function(err) {
            expect(err).to.be.null;
            done();
          });
        });
      });
    });
  });

  it('loads a fake user: Jeff Lebowski', function(done) {
    var hash = {
      fullName: 'Jeff Lebowski',
      userName: 'dude',
      email: 'jeff@example.com',
      password: 'dude',
      photoURL: '',
    };
    User.create(hash, function(err, doc) {
      expect(err).to.be.null;
      expect(doc).to.not.be.null;
      userID = doc._id;
      done();
    });
  });

  it('creates a fake card: buy Half & Half', function(done) {
    var hash = {
      name: 'this is a card',
      content: 'card content',
      colors: ['#ffffff'],
      comments: ['first post'],
      users: [userID],
    };
    Card.create(hash, function(err, doc) {
      if (err) console.error(err);
      expect(err).to.be.null;
      expect(doc).to.not.be.null;

      cardID = doc._id;

      Card.get(doc._id, function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.not.be.null;
        done();
      });
    });
  });

  it('creates a fake column: Todo List', function(done) {
    var hash = {
      name: 'Todo List',
      cards: [cardID],
    };
    Column.create(hash, function(err, doc) {
      expect(err).to.be.null;
      expect(doc).to.not.be.null;

      columnID = doc._id;
      done();
    });
  });

  it('creates a fake board: Board-o-rama', function(done) {
    var hash = {
      name: 'Board-o-rama',
      columns: [columnID],
      users: [userID],
      colors: ["#ffffff"],
    };
    Board.create(hash, function(err, doc) {
      expect(err).to.be.null;
      expect(doc).to.not.be.null;

      done();
    })
  });

  after(function(done) {
    User.disconnect(function() {
      Card.disconnect(function() {
        Column.disconnect(function() {
          Board.disconnect(done);
        });
      });
    });
  });
});
