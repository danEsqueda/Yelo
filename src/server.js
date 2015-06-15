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

    app.post('/boards', function(req, res) {
      var hash = { name: 'default board name' };
      Resource.create(hash, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(201).send(doc._doc); }
      });
    });

    app.put('/boards/:id', function(req, res) {
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Updated board ' + doc._doc._id); }
      });
    });

    app.delete('/boards/:id', function(req, res) {
      Resource.drop(req.params.id, function(err) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Dropped resource ' + req.params.id); }
      });
    });
  });

var Column = new PersistentResource(mongoURL,
  'yelo', 'columns', {
    name: String,
  },
  function(err) {
    if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

    app.get('/columns', function(req, res) {
      Resource.getAll(function(err, docs) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send(docs); }
      });
    });

    app.use(bodyParser.json());

    app.post('/columns', function(req, res) {
      var hash = { name: 'default column name' };
      Resource.create(hash, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(201).send(doc._doc); }
      });
    });

    app.put('/columns/:id', function(req, res) {
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Updated board ' + doc._doc._id); }
      });
    });

    app.delete('/columns/:id', function(req, res) {
      Resource.drop(req.params.id, function(err) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Dropped resource ' + req.params.id); }
      });
    });
  });

var User = new PersistentResource(mongoURL,
  'yelo', 'users', {
    name: String,
  },
  function(err) {
    if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

    app.get('/users', function(req, res) {
      Resource.getAll(function(err, docs) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send(docs); }
      });
    });

    app.use(bodyParser.json());

    app.post('/users', function(req, res) {
      var hash = { name: 'default user name' };
      Resource.create(hash, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(201).send(doc._doc); }
      });
    });

    app.put('/users/:id', function(req, res) {
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Updated board ' + doc._doc._id); }
      });
    });

    app.delete('/users/:id', function(req, res) {
      Resource.drop(req.params.id, function(err) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Dropped resource ' + req.params.id); }
      });
    });
  });

var Card = new PersistentResource(mongoURL,
  'yelo', 'cards', {
    name: String,
  },
  function(err) {
    if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

    app.get('/cards', function(req, res) {
      Resource.getAll(function(err, docs) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send(docs); }
      });
    });

    app.use(bodyParser.json());

    app.post('/cards', function(req, res) {
      var hash = { name: 'default card name' };
      Resource.create(hash, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(201).send(doc._doc); }
      });
    });

    app.put('/cards/:id', function(req, res) {
      Resource.save(req.params.id, req.body, function(err, doc) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Updated board ' + doc._doc._id); }
      });
    });

    app.delete('/cards/:id', function(req, res) {
      Resource.drop(req.params.id, function(err) {
        if (err) { res.status(500).send('Database Error'); }
        else { res.status(200).send('Dropped resource ' + req.params.id); }
      });
    });
  });

var port = 3000;
app.listen(port, function() {
  console.log('Listening on :' + port + '.');
});
