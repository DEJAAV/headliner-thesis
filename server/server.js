var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var path = require('path');
var flash = require('connect-flash')
var passport = require('passport');
var Auth = require('./auth.js');

var Users = require('./models/users.js');


var knex = require('knex')(Auth.pgData);

app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true
                })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(port);
console.log('Server running on port:', port)


passport.use('local-signup', new LocalStrategy({
    usernameField : 'localEmail',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {
    console.log('/////////////////');
    console.log('Inside of passport use local-signup');
    Users.getUserByEmail(username).then(function(user, err) {
      console.log(user[0]);
      // if there are any errors, return the error
      if (err) {
        console.log('There was an error');
        console.log(err);
        return done(err);
      }
      // check to see if theres already a user with that email
      if (user[0]) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        // create the user
        Users.signupLocal(username, password).then(function(err, user) {
          if (err) {return done(err);}
          console.log('No errors!');
          console.log(user);
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

// app.post('/api/users/artists', function(req, res) {
//   console.log(req.body);
//   res.send('success');
// })

app.post('/api/users/artists', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/#/signup-venue', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
