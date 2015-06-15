var mongo = require('mongo');
var mongojs = require('mongojs');
var db = mongojs('yelo', ['users', 'boards', 'cards', 'columns']);
var keygen = require('keygen');

/*res.status(200).cookie('session', sessionID)
          .send('User is logged in');
          req.session.token = sessionID;*/

setSession = function(req, res, callback) {
  var userKey = keygen.url(keygen.medium);
  // Write the keygen to the user file to check later
    db.users.insert({fullname: 'Kendall Comey', username: 'kcomey',
    password: '1234', photo: '', session: userKey},
    {new: true},
    function(err, result) {
      // callback function should set the cookie
      callback(err, userKey);
    }
  );
/*  db.users.insert({fullname: req.body.fullname, username: req.body.username,
    password: req.body.password, photo: req.body.photo, session: userKey},
    {new: true},
    function(err, result) {
      callback(err, userKey);
    }
  );*/
};

//setSession();

isAuthenticated = function(req, res, next) {
  // If they are just logging in they don't need to be authenticated yet
/*  if (req.path === '/login') {
    return next();
  }*/
  //var token = req.cookies.session;
  // take next line out
  var token = 'EL3Wro4Uit2z7x9hkXuZNT';
  if (token === undefined) {
    // If no token, they need to login
    res.redirect('/login');
    return;
  }
  // If token, need to make sure it's in the database
  db.users.findOne({ session: token }, function(err, user) {
    if (err) {
      console.log('ERROR!');
    }
    // If key is found, send them on their way
    if (user) {
      console.log('token was found');
      next();
    } else {
      // Are not authorized
      res.redirect('/login');
    }
  });
};

isAuthenticated();

