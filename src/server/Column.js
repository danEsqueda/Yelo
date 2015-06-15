'use strict';

module.exports = function(app, mongoURL) {
  var Column = new PersistentResource(mongoURL,
    'yelo', 'columns', {
      name: String,
    },
    function(err) {
      if (err) { throw new Error('ERROR: Could not connect to MongoDB'); }

      app.get('/columns', function(req, res) {
        Column.getAll(function(err, docs) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send(docs); }
        });
      });

      app.use(bodyParser.json());

      app.post('/columns', function(req, res) {
        var hash = { name: 'default column name' };
        Column.create(hash, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(201).send(doc._doc); }
        });
      });

      app.put('/columns/:id', function(req, res) {
        Column.save(req.params.id, req.body, function(err, doc) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Updated column ' + doc._doc._id); }
        });
      });

      app.delete('/columns/:id', function(req, res) {
        Column.drop(req.params.id, function(err) {
          if (err) { res.status(500).send('Database Error'); }
          else { res.status(200).send('Dropped column ' + req.params.id); }
        });
      });
    });

  return Column;
};
