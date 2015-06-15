'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var PersistentResource = require('./persistent-resource');

var app = express();
app.use(express.static('www'));

var mongoURL = 'mongodb://localhost:27017';
var Board = new PersistentResource(mongoURL,
  'yelo', 'boards', {
    name: String,
  },
  function(err) {
    if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

    app.get('/boards', function(req, res) {
      Resource.getAll(function(err, docs) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send(docs); }
      });
    });

    app.use(bodyParser.json());
    app.post('/todos', function(req, res) {
      var hash = { name: 'default name' };
      Resource.create(hash, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(201).send(doc._doc); }
      });
    });

    app.put('/todos/:id', function(req, res) {
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Updated resource ' + doc._doc._id); }
      });
    });

    app.delete('/todos/:id', function(req, res) {
      Resource.drop(req.params.id, function(err) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Dropped resource ' + req.params.id); }
      });
    });

    var port = 3000;
    app.listen(port, function() {
      console.log('Listening on :' + port + '.');
    });
  });
