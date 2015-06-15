'use strict';

module.exports = function(app, mongoURL) {
  var Board = new PersistentResource(mongoURL,
    'yelo', 'boards', {
      name: String,
      columns: [Column],
      users: [User],
      colors: [String]
    },
    function(err) {
      if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

      app.get('/boards', function(req, res) {
        Board.getAll(function(err, docs) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(docs); }
        });
      });

      app.get('/boards/:id', function(req, res) {
        if(req.accepts(['text/html', 'application/json']) == 'text/html') {
          Board.getAll(function(err, docs) {
            if (err) { res.status(500).send('Database Error'); }
            else { res.status(200).send(docs); }
          });
        } else if (req.accepts(['text/html', 'application/json']) == 'text/html') {
          
          Board.getAll(function(err, docs) {
            if (err) { res.status(500).send('Database Error'); }
            else { res.status(200).send(docs); }
          });
          
        } else {
          res.sendStatus(406);
        }
      });

      app.use(bodyParser.json());

      app.post('/boards', function(req, res) {
        var hash = { name: 'default board name' };
        Board.create(hash, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(201).send(doc._doc); }
        });
      });

      app.put('/boards/:id', function(req, res) {
        Board.save(req.params.id, req.body, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Updated board ' + doc._doc._id); }
        });
      });

      app.delete('/boards/:id', function(req, res) {
        Board.drop(req.params.id, function(err) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Dropped board ' + req.params.id); }
        });
      });
    });

  return Board;
};
