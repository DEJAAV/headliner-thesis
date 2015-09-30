var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Venues = require('./models/venues.js');
var Bands = require('./models/bands.js');
var Shows = require('./models/shows.js');
var Venue_Reviews = require('./models/venue_reviews.js');

module.exports = function (app) {

  app.post('/api/users/venues', function(req, res, next) {
    Venues.create(req.body).then(function(result) {
      res.json('success');
    });
  });

  app.post('/api/users/artists', function(req, res, next) {
    Bands.create(req.body).then(function(result) {
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
    Bands.getAll().then(function(result) {
      res.json(result);
    });
  });

  app.get('/api/venues', function(req, res, next) {
    Venues.getAll().then(function(result) {
      res.json(result);
    });
  });

};
