'use strict';

module.exports = function(app, mongoURL) {
  var Card = new PersistentResource(mongoURL,
    'yelo', 'cards', {
      name: String,
      content: String,
      colors: [String],
      comments: [String],
      users: [User],
      parent: ColumnId
    },
    function(err) {
      if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

      app.get('/cards', function(req, res) {
        Card.getAll(function(err, docs) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(docs); }
        });
      });

      app.use(bodyParser.json());

      app.post('/cards', function(req, res) {
        var hash = { name: 'default card name' };
        Card.create(hash, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(201).send(doc._doc); }
        });
      });

      app.put('/cards/:id', function(req, res) {
        Card.save(req.params.id, req.body, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Updated card ' + doc._doc._id); }
        });
      });

      app.delete('/cards/:id', function(req, res) {
        Card.drop(req.params.id, function(err) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Dropped card ' + req.params.id); }
        });
      });
    });

  return Card;
};
