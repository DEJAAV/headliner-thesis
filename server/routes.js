var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Venues = require('./models/venues.js');
var Artists = require('./models/artists.js');
var Shows = require('./models/shows.js');
var Venue_Reviews = require('./models/venue_reviews.js');
var Requests = require('./models/requests.js');
var Messages = require('./models/messages.js');
var jwt = require('jwt-simple');
var Auth = (process.env.NODE_ENV === 'production') ? require('./auth.js') : require('./localauth.js');
var Songs = require('./models/songs.js');

module.exports = function (app) {

  app.post('/api/users/venues', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Venues.create(req.body, user_id).then(function(venue_id) {
      Venues.getVenueByUser(user_id).then(function(venue) {
        res.json(venue);
      })
    });
  });

  app.post('/api/users/artists', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Artists.create(req.body, user_id).then(function(result) {
      Artists.getArtistByUser(user_id).then(function(artist) {
        console.log('artist: ', artist);
        res.json(artist);
      })
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
    Requests.sendRequest(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/accept', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Requests.acceptRequest(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.get('/api/requests', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Requests.getRequests(user_id).then(function(result) {
      res.json(result);
    });
  })

  app.post('/api/requests/read', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Requests.markAsRead(user_id).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/message', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Messages.sendMessage(req.body, user_id).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/messages/read', function(req, res, next) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Messages.markAsRead(req.body, user_id).then(function(result) {
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
  });

  app.get('/api/artist/shows', function(req, res) {
    Shows.getShowsByArtistId(req.body).then(function(shows) {
      console.log(shows, 'shows')
      res.json(shows)
    })
  })

  app.get('/api/getId', function(req, res) {
    var user_id = jwt.decode(req.headers['x-access-token'], Auth.secret);
    Users.getUserById(user_id).then(function(result) {
      res.json(result);
    })
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};
