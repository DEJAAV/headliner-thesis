var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Venues = require('./models/venues.js');
var Bands = require('./models/bands.js');

module.exports = function (app) {

  app.post('api/users/signup', function(req, res, next) {
    Users.signupLocal(req.body.username, req.body.password);
    if (req.body.venue_id) {
      Venues.create(req.body);
    } else if (req.body.band_id) {
      Bands.create(req.body);
    }
  });

  app.post('api/users/login', function(req, res, next) {
    Users.signInLocal(req.body.username, req.body.password);
  }); 

  app.get('api/bands/all', function(req, res, next) {
    Bands.getAll(req.body.band_id);
  });

  app.get('api/venues/all', function(req, res, next) {
    Bands.getAll(req.body.venue_id);
  });

};
