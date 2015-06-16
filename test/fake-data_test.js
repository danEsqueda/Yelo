'use strict';

var chai = require('chai');
var expect = chai.expect;

var express = require('express');
var app = express();

var ObjectID = require('mongoose').Schema.Types.ObjectId;
var MONGO = 'mongodb://localhost:27017';
var User = require('../src/server/User')(app, MONGO, 'yelo_test');
var Card = require('../src/server/Card')(app, MONGO, 'yelo_test');

describe('loading fake data', function() {
  var userID;

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

      Card.getPopulated(doc._id, 'users', function(err, doc) {
        expect(err).to.be.null;
        expect(doc).to.not.be.null;
        done();
      });
    });
  });

  after(function(done) {
    User.disconnect(done);
    Card.disconnect(done);
  });
});
