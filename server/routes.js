var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Venues = require('./models/venues.js');
var Artists = require('./models/artists.js');
var Shows = require('./models/shows.js');
var Venue_Reviews = require('./models/venue_reviews.js');
var Requests = require('./models/requests.js');
var Messages = require('./models/messages.js');
var jwt = require('jwt-simple');
var Auth = require('./auth.js');
var Songs = require('./models/songs.js');

module.exports = function (app) {

  app.post('/api/users/venues', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Venues.create(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/users/artists', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Artists.create(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/users/venues/update', function(req, res, next) {
    Venues.update(req.body).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/users/artists/update', function(req, res, next) {
    Artists.update(req.body).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/shows', function(req, res, next) {
    Shows.addShow(req.body).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/venue_reviews', function(req, res, next) {
    Venue_Reviews.addReview(req.body).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/users/login', function(req, res, next) {
    Users.signInLocal(req.body.username, req.body.password).then(function(result) {
      res.json('success');
    });
  });

  app.get('/api/artists', function(req, res, next) {
    Artists.getAll().then(function(result) {
      res.json(result);
    });
  });

  app.get('/api/venues', function(req, res, next) {
    Venues.getAll().then(function(result) {
      res.json(result);
    });
  });

  app.post('/api/request', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Requests.sendRequest(req.body, req.user).then(function(result) {
      res.json('success');
    });
  });

  app.get('/api/requests', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret)
    Requests.getRequests(user_id).then(function(result) {
      res.json(result);
    });
  })

  app.post('/api/message', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Messages.sendMessage(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.get('/api/messages', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Messages.getMessages(user_id).then(function(result) {
      res.json(result);
    });
  });

  app.get('/api/conversations', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Messages.getConversations(user_id).then(function(result) {
      res.json(result);
    });
  });

  app.get('/api/songs', function(req, res) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Songs.getSongsByUser(user_id).then(function(songs) {
      res.json(songs);
    })
  })

};
