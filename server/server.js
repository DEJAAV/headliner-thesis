var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var flash = require('connect-flash')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var pg = require('pg');

var databasehost = process.env.HOST || 'localhost';
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: databasehost,
    database: 'headliner',
    charset: 'utf8'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

app.use(express.static(__dirname + '/../client'));
app.use(passport.initialize());
app.use(passport.session());

app.listen(port);
console.log('Server running on port:', port)

var Users = require('./models/Users');

passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {
    Users.getUserByName(username).then(function(err, user) {
      // if there are any errors, return the error
      if (err) {return done(err);}
      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        // create the user
        Users.signupLocal(username, password).then(function(err, user) {
          if (err) {return done(err);}
          return done(null, user);
        });
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  Users.getUserById(id).then(function(err, user) {
    done(err, user);
  });
});

app.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/signup-venue', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
