var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Venues = require('./models/venues.js');
var Bands = require('./models/bands.js');

module.exports = function (app) {

  app.post('api/users/venues', function(req, res, next) {
    Users.signupLocal(req.body.username, req.body.password);
    Venues.create(req.body);
  });

  app.post('api/users/artists', function(req, res, next) {
    Users.signupLocal(req.body.username, req.body.password);
    Bands.create(req.body);
  });

  app.post('api/users/login', function(req, res, next) {
    Users.signInLocal(req.body.username, req.body.password);
  }); 

  app.get('api/artists', function(req, res, next) {
    Bands.getAll();
  });

  app.get('api/venues', function(req, res, next) {
    Venues.getAll();
  });

};
