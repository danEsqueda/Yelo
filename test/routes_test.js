'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var Q = require('q');
var mongoURL = 'mongodb://localhost:27017';

describe('the Express server', function() {
  before(function(done) {
    Q.nfbind(require('../src/server/Board'))(app, mongoURL, 'yelo_test')
    .then(function() {
      Q.nfbind(require('../src/server/Column'))(app, mongoURL, 'yelo_test');
    })
    .then(function() {
      Q.nfbind(require('../src/server/User'))(app, mongoURL, 'yelo_test');
    })
    .then(function() {
      Q.nfbind(require('../src/server/Card'))(app, mongoURL, 'yelo_test');
    })
    .then(function() {
      done();
    });
  });
  it('serves GET /boards with a JSON list', function(done) {
    chai.request(app)
    .get('/boards')
    .then(function(res) {
      console.log(res);
      expect(res).to.have.status(200);
      done();
    }, function(err) {
      console.error('ERROR:', err);
      expect(err).to.be.null;
      done();
    });
  });
});
