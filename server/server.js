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

passport.serializeUser(function(user, done) {
  console.log('WE INSIDE THE SERIALIZE FUNCTION YEAAAAAAA');
  console.log(user)
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  Users.getUserById(id).then(function(user, err) {
    done(err, user[0]);
  });
});

/*---------------Local Sign Up Strategy ---------------------- */
passport.use('local-signup', new LocalStrategy({
    usernameField : 'localEmail',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {
    console.log('/////////////////');
    console.log('Inside of passport use local-signup');
    Users.getUserByEmail(username).then(function(user, err) {
      console.log('GETTING USER BY THE EMAIL: ')
      console.log(user[0]);
      // if there are any errors, return the error
      if (err) {
        console.log('There was an error');
        console.log(err);
        return done(err);
      }
      // check to see if theres already a user with that email
      if (user[0]) {
        console.log('This username was already taken.')
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        // hash the password
        Users.hashPassword(req.body.password).then(function(hashed) {
          console.log('WE HASHIN THE PASSWORD');
          //insert the email and hashed password
          Users.signupLocal(req.body.localEmail, hashed)
          //returns user_id from the newly created user
          .then(function(id) {
            //use that id to return a user object to serialize
            Users.getUserById(id[0]).then(function(user) {
              console.log('ABOUT TO SERIALIZE ALL OVER THIS')
              done(null, user[0]);
            })
          })
        })
      }
    });
  })
);

/*---------------- Local Sign In Strategy ---------------------- */
passport.use('local-signin', new LocalStrategy({
  usernameField: 'localEmail',
  passwordField: 'password',
  passReqToCallback: true
  },
  function(req, username, password, done) {
    console.log('Does req.user exist?');
    console.log(req.user);
    console.log('////////////////////////////////');
    console.log('INSIDE OF PASSPORT USE FOR LOCAL-SIGNIN');
    Users.getUserByEmail(username).then(function(user, err) {
      if(!user[0]) {
        console.log('User does not exist');
        return done(null, false, req.flash('signinMessage', 'This email address has not been registered'));
      } else {
        console.log('WE COMPARIN PASSWORDS')
        if(Users.comparePassword(password, user[0].password)) {
          console.log('IT IS TRUE!');
          return done(null, user[0]);
        } else {
          console.log('IT DID NOT PASS');
          return done(null, false, req.flash('failedPassword', 'Incorrect password'));
        }
      }
    })
  })
)

/*--------------- Facebook OAuth Strategy ---------------------- */
passport.use(new FacebookStrategy({
  clientID: Auth.facebookAuth.clientID,
  clientSecret: Auth.facebookAuth.clientSecret,
  callbackURL: Auth.facebookAuth.callbackURL,
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  }, 

  function(accessToken, refreshToken, profile, done) {
    console.log('FACEBOOK PROFILE ///////////////////////');
    console.log(profile);
    process.nextTick(function() {
      //If there is no Facebook user in the database, we're going to add one
      Users.getUserByFacebook(profile.id).then(function(user) {
        if(user[0]) {
          console.log('THIS GUY EXISTS');
          console.log(user[0]);
          return done(null, user[0]);
        } else {
          //Add the user to the database here
          Users.signupFacebook(profile.emails[0].value, profile.id, accessToken, profile.name.givenName).then(function(id) {
            console.log('Finished adding this facebook user to the database');
            Users.getUserById(id[0]).then(function(user) {
              return done(null, user[0]);
            })
          })
        }
      })
    });
  })
);

/*--------------- Google OAuth Strategy ---------------------- */
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
          //create user with their google information
          Users.signupGoogle(profile).then(function(id) {
            console.log("INSIDE GOOGLE SIGNUP IN THE GOOGLE STRAT");
            Users.getUserById(id[0]).then(function(user) {
              return done(null, user[0]);
            })
          })
        }
      });
    })
  })
);


app.post('/api/users/local', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/#/', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
  })
);

app.post('/api/users/login', passport.authenticate('local-signin', {
  successRedirect: '/#/homepage-venue',
  failureRedirect: '/#/',
  failureFlash: true
  })
); 

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#/select',
  failureRedirect: '/#/',
  failureFlash: true
  })
);

app.get('/auth/google', function(req, res, next) {
  if(!req.user) { //Not already logged-in, we'll continue on to authenticating
     console.log('IT IS REQ USER TIME!!!!');
     console.log(req.user);
    return next();
  }
  res.redirect('/');
  }, passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

app.post('/test', function(req, res) {
  Users.hashPassword(req.body.password).then(function(hashed) {
    Users.signupLocal(req.body.email, hashed)
    .then(function(id) {
      console.log('request////////')
      console.log(req.body);
      console.log(req.email);
      console.log(id)
      res.json(id);
    })
  })
});

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect: '/#/select',
    failureRedirect: '/#/' })
);

require('./routes.js')(app);

app.listen(port);
console.log('Server running on port:', port)