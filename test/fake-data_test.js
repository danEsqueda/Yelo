'use strict';

var chai = require('chai');
var expect = chai.expect;

var express = require('express');
var app = express();

var MONGO = 'mongodb://localhost:27017';
var User = require('../src/server/User')(app, MONGO, 'yelo_test');

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

  after(function(done) {
    User.disconnect(done);
  });
});
