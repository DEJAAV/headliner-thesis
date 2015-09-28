var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

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
        Users.signupLocal(username, password).then(function(user, err) {
          if (err) {return done(err);}
          console.log('No errors!');
          console.log(user);
          return done(null, user[0]);
        });
      }
    });
  })
);

passport.use(new FacebookStrategy({
  clientID: Auth.facebookAuth.clientID,
  clientSecret: Auth.facebookAuth.clientSecret,
  callbackURL: Auth.facebookAuth.callbackURL
  }, 
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      Users.getUserByFacebook(profile.id).then(function(user) {
        if(user[0]) {
          console.log('THIS GUY EXISTS');
          return done(null, user[0]);
        } else {
          console.log('FACEBOOK PROFILE:  ++++++++++ ');
          console.log(profile);
          Users.signupFacebook(profile.emails[0].value, profile.id, accessToken, profile.name.givenName).then(function(user) {
            console.log('No errors! FACEBOOK');
            return done(null, user[0]);
          })
        }
      })
    });
  })
);

passport.use(new GoogleStrategy({
  clientID: Auth.googleAuth.clientID,
  clientSecret: Auth.googleAuth.clientSecret,
  callbackURL: Auth.googleAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log('Firing up the Google Strategy');
      console.log(profile);
      console.log('/////////////////////////////////////////');
      console.log('token: ');
      console.log(token);
      //check for the user by google_id, if it doesn't exist signup, else call done returning user_id
      Users.getUserByGoogle(profile.id).then(function(user) {
        if(user[0]) {
          console.log('Logging in!');
          return done(null, user[0]);
        } else {
          Users.signupGoogle(profile).then(function(user) {
            console.log("INSIDE GOOGLE SIGNUP IN THE GOOGLE STRAT");
            return done(null, user[0]);
          })
        }
      });
    })
  })
);

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  Users.getUserById(id).then(function(user, err) {
    done(err, user[0]);
  });
});

app.post('/api/users/local', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/#/signup-venue', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
  })
);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/#/signup-venue',
  failureFlash: true
  })
);

app.get('/auth/google', function(req, res, next) {
  if(!req.user) { //Not already logged-in, we'll continue on to authenticating
    return next();
  }
  res.redirect('/');
  }, passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/#/signup-venue' })
);

require('./routes.js')(app);

app.listen(port);
console.log('Server running on port:', port)