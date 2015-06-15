'use strict';

var mongoose = require('mongoose');

/**
 * Represents a RESTful resource backed by a MongoDB collection.  Operations
 * on this object will asynchronously affect the database.
 * @constructor
 * @param {string} mongoURL - the 'mongodb://user:pass@localhost:port' part of
 *                            the URL, with no trailing slash
 * @param {string} databaseName - the name of the database
 * @param {string} name - the pluralized resource name, e.g. 'todos'
 * @param {object} schema - the JSON schema with type information
 * @param {function} callback - run when the DB connection opens, called as
 *                              callback(err) or callback(null, this)
 */
function PersistentResource(mongoURL, databaseName, name, schema, callback) {
  if (arguments.length < 5) {
    throw new Error('need 5 arguments to PersistentResource');
  }

  this.db = mongoose.createConnection(mongoURL + '/' + databaseName);
  this.schema = mongoose.Schema(schema);
  this.model = this.db.model(name, this.schema, name);

  this.db.on('error', callback);
  this.db.once('open', function() {
    callback(null);
  });
}

PersistentResource.prototype.getAll = function(callback) { // (err, docs)
  this.model.find().lean().exec(callback);
};

PersistentResource.prototype.get = function(id, callback) { // (err, doc)
  this.model.findOne({ _id: id }).lean().exec(callback);
};

PersistentResource.prototype.create = function(hash, callback) { // (err, doc)
  this.model.create(hash, callback);
};

PersistentResource.prototype.save = function(id, hash, callback) { // (err, doc)
  this.model.findOneAndUpdate({ _id: id }, hash, { new: true }, callback);
};

PersistentResource.prototype.drop = function(id, callback) { // (err)
  this.model.findOneAndRemove({ _id: id }, callback);
};

PersistentResource.prototype.dropAll = function(callback) { // (err)
  this.model.remove({}, callback);
};

PersistentResource.prototype.disconnect = function(callback) { // ()
  this.db.close(callback);
};

module.exports = PersistentResource;
