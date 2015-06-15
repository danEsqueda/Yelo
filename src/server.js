'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var PersistentResource = require('./persistent-resource');

var mongoURL = 'mongodb://localhost:27017';
var Resource = new PersistentResource(mongoURL,
  'todos', 'todos', {
    created: Date,
    task: String,
    done: Boolean,
  },
  function(err) {
    if (err) {
      throw new Error('ERROR: Could not connect to MongoDB');
    }

    var app = express();
    app.use(express.static('www'));

    app.get('/todos', function(req, res) {
      console.log('GET /todos');
      Resource.getAll(function(err, docs) {
        if (err) {
          res.status(500).send('Database Error');
        } else {
          res.status(200).send(docs);
        }
      });
    });

    app.use(bodyParser.json());
    app.post('/todos', function(req, res) {
      console.log('POST /todos');
      req.body.created = new Date();
      req.body.done = false;
      var hash = { done: false, created: new Date(), task: req.body.task };
      Resource.create(hash, function(err, doc) {
        if (err) {
          console.error('ERROR: Could not create new todo');
          res.status(500).send('Database Error');
        } else {
          console.info('Created todo ' + doc._doc._id);
          res.status(201).send(doc._doc);
        }
      });
    });

    app.put('/todos/:id', function(req, res) {
      console.log('PUT /todos/' + req.params.id);
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) {
          res.status(500).send('Database Error');
        } else {
          res.status(200).send('Updated todo ' + doc._doc._id);
        }
      });
    });

    app.delete('/todos/:id', function(req, res) {
      console.log('DELETE /todos/' + req.params.id);
      Resource.drop(req.params.id, function(err) {
        if (err) {
          res.status(500).send('Database Error');
        } else {
          res.status(200).send('Dropped todo ' + req.params.id);
        }
      });
    });

    var port = 3000;
    app.listen(port, function() {
      console.log('Listening on :' + port + '.');
    });
  });
