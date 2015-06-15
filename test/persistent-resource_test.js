'use strict';

var PersistentResource = require('../persistent-resource');
var chai = require('chai');
var expect = chai.expect;
expect(PersistentResource).to.not.be.null;

var MONGO = 'mongodb://localhost:27017';
var DATABASE = 'yelo_test';
var COLLECTION = 'yelo_test';
var SCHEMA = {
  name: String,
};

describe('a PersistentResource', function() {
  var PR;
  before(function(done) {
    PR = new PersistentResource(MONGO, DATABASE, COLLECTION, SCHEMA,
      function(err) {
        expect(err).to.be.null;
        done();
      });
  });

  it('has a constructor with 5 required arguments', function() {
    expect(PersistentResource).to.throw(Error);
  });

  it('is not null when constructed with 5 arguments', function() {
    expect(PR).to.not.be.null;
  });

  it('can drop all documents', function(done) {
    PR.dropAll(function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('has no documents after dropping', function(done) {
    PR.getAll(function(err, docs) {
      expect(err).to.be.null;
      expect(docs).to.eql([]);
      done();
    });
  });

  it('can add 2 identical documents', function(done) {
    var hash = { created: new Date(), task: 'test the DB', done: false };
    PR.create(hash, function(err, doc) {
      expect(err).to.be.null;
      expect(doc._doc.task).to.eql(hash.task);
      PR.create(hash, function(err, doc) {
        expect(err).to.be.null;
        expect(doc._doc.task).to.eql(hash.task);
        done();
      });
    });
  });

  it('has 2 documents after adding 2', function(done) {
    PR.getAll(function(err, docs) {
      expect(err).to.be.null;
      expect(docs.length).to.equal(2);
      done();
    });
  });

  after(function(done) {
    PR.disconnect(done);
  });
});