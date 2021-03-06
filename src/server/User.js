'use strict';

var PersistentResource = require('./persistent-resource');

module.exports = function(app, mongoURL, database, callback) {
  var User = new PersistentResource(mongoURL,
    database, 'users', {
      fullName: String,
      userName: String,
      email: String,
      password: String,
      photoURL: String,
      session: String,
    },
    function(err) {
      if (err) {
        console.error(err);
        throw new Error('ERROR: Could not connect to MongoDB');
      }

      app.get('/users', function(req, res) {
        User.getAll(function(err, docs) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(docs); }
        });
      });

      app.get('/users/:id', function(req, res) { // serve application/json
        User.get(req.params.id, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(doc); }
        });
      });

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

      app.post('/login', function(req, res) {
        if (!req.body.username || !req.body.password) {
          res.status(403).send('Unauthorized');
        } else {
          User.find({ userName: req.body.username }, function(err, doc) {
            if (err || !doc || !doc.password || doc.password !== req.body.password) {
              res.status(403).send('Unauthorized');
            } else {
              res.status(200).send(doc);
            }
          });
        }
      });

      callback();
    });

  return User;
};
