'use strict';

var PersistentResource = require('./persistent-resource');

module.exports = function(app, mongoURL, database) {
  var User = new PersistentResource(mongoURL,
    database, 'users', {
      fullName: String,
      userName: String,
      email: String,
      password: String,
      photoURL: String
    },
    function(err) {
      if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

      app.get('/users', function(req, res) {
        User.getAll(function(err, docs) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(docs); }
        });
      });

      app.use(require('body-parser').json());

      app.post('/users', function(req, res) {
        var hash = { name: 'default user name' };
        User.create(hash, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(201).send(doc._doc); }
        });
      });

      app.put('/users/:id', function(req, res) {
        User.save(req.params.id, req.body, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Updated user ' + doc._doc._id); }
        });
      });

      app.delete('/users/:id', function(req, res) {
        User.drop(req.params.id, function(err) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Dropped user ' + req.params.id); }
        });
      });
    });

  return User;
};
