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
    chai.request(app).get('/boards').then(function(res) {
      expect(res).to.have.status(200);
      expect(res.body.length).to.not.be.null;
      done();
    });
  });

  it('serves GET /boards/:id with a JSON object', function(done) {
    var boardID;
    chai.request(app).get('/boards').then(function(res) {
      expect(res).to.have.status(200);
      boardID = res.body[0]._id;
      chai.request(app)
      .get('/boards/' + boardID)
      .set('Accept', 'application/json')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body._id).to.equal(boardID);
        done();
      });
    });
  });

  it('serves GET /cards with a JSON list', function(done) {
    chai.request(app).get('/cards').then(function(res) {
      expect(res).to.have.status(200);
      expect(res.body.length).to.not.be.null;
      done();
    });
  });

  it('serves GET /cards/:id with a JSON object', function(done) {
    var cardID;
    chai.request(app).get('/cards').then(function(res) {
      expect(res).to.have.status(200);
      cardID = res.body[0]._id;
      chai.request(app)
      .get('/cards/' + cardID)
      .set('Accept', 'application/json')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.null;
        expect(res.body._id).to.equal(cardID);
        done();
      });
    });
  });
});
