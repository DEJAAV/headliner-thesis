var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//passport strategies
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

//modules
var session = require('express-session');
var logger = require('morgan')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var path = require('path');
var flash = require('connect-flash')
var passport = require('passport');
var jwt = require('jwt-simple');

//Auth and model modules
var Auth = require('./auth.js');
var Users = require('./models/users.js');

//db
var knex = require('knex')(Auth.pgData);

//middleware setup
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(session({ secret: Auth.secret,
                  saveUninitialized: true,
                  resave: false
                })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());  //used to set a property in req.session

passport.serializeUser(function(user, done) {
  if(user) {
    done(null, user.user_id);
  } else {
    done(null, user);
  }
});

passport.deserializeUser(function(id, done) {
  Users.getUserById(id).then(function(user, err) {
    done(err, user[0]);
  });
});

//some middleware to log what's going on
app.use(function(req, res, next) {
  console.log('current user: ');
  console.log(req.user);
  console.log('**************');
  console.log('current session: ');
  console.log(req.session);
  console.log('Current Request: ');
  console.log(req);
  console.log('************************');
  next();
});

/*---------------Local Sign Up Strategy ---------------------- */
passport.use('local-signup', new LocalStrategy({
    usernameField : 'localEmail',
    passwordField : 'password',
    passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    session: true
  },
  function(req, username, password, done) {
    Users.getUserByEmail(username).then(function(user, err) {
      // if there are any errors, return the error
      if (err) {
        return done(err);
      }
      // check to see if theres already a user with that email
      if (user[0]) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        // hash the password
        Users.hashPassword(req.body.password).then(function(hashed) {
          //insert the email and hashed password
          Users.signupLocal(req.body.localEmail, hashed)
          //returns user_id from the newly created user
          .then(function(id) {
            //use that id to return a user object to serialize
            Users.getUserById(id[0]).then(function(user) {
              return done(null, user[0]);
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
  passReqToCallback: true,
  session: true
  },
  function(req, username, password, done) {
    Users.getUserByEmail(username).then(function(user, err) {
      if(!user[0]) {
        return done(null, false);
      } else {
        Users.comparePassword(password, user[0].password).then(function(result){
          if(result) {
            return done(null, user[0]);
          } else {
            //redirect to error handling endpoint
            return done(null, false);
          }
        })
      }
    })
  })
);

/*--------------- Facebook OAuth Strategy ---------------------- */
passport.use(new FacebookStrategy({
  clientID: Auth.facebookAuth.clientID,
  clientSecret: Auth.facebookAuth.clientSecret,
  callbackURL: Auth.facebookAuth.callbackURL,
  passReqToCallback: true,
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  }, 

  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      //If there is no Facebook user in the database, we're going to add one
      Users.getUserByFacebook(profile.id).then(function(user) {
        if(user[0]) {
          return done(null, user[0]);
        } else {
          //Add the user to the database here
          Users.signupFacebook(profile.emails[0].value, profile.id, accessToken, profile.name.givenName).then(function(id) {
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
      //check for the user by google_id, if it doesn't exist signup, else call done returning user_id
      Users.getUserByGoogle(profile.id).then(function(user) {
        if(user[0]) {
          return done(null, user[0]);
        } else {
          //create user with their google information
          Users.signupGoogle(profile).then(function(id) {
            Users.getUserById(id[0]).then(function(user) {
              return done(null, user[0]);
            })
          })
        }
      });
    })
  })
);


app.post('/api/users/local', passport.authenticate('local-signup', {}), function(req, res) {
  var response = {};
  response.token = jwt.encode(req.user.user_id, Auth.secret);
  Users.getUserById(req.user.user_id).then(function(user) {
    if(user[0].artist_id !== null) {
      response.type = 'artist';
    } else if(user[0].venue_id !== null) {
      response.type = 'venue';
    } else {
      response.type = null;
    }
  }).then(function() {
    res.json(response);
  });
});

app.post('/api/users/login', passport.authenticate('local-signin', { failureRedirect: '/api/users/login/error' }),
  function(req, res) {
    if(!req.user) {
      res.json({error: 'Incorrect username/password'})
    }
    var response = {};
    response.token = jwt.encode(req.user.user_id, Auth.secret);
    Users.getUserById(req.user.user_id).then(function(user) {
      if(user[0].artist_id !== null) {
        response.type = 'artist';
      } else if(user[0].venue_id !== null) {
        response.type = 'venue';
      } else {
        response.type = null;
      }
    }).then(function() {
      res.json(response);
    });
  }
);

app.get('/api/users/login/error', function(req, res) {
  res.json({ error: 'Incorrect username/password' });
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#/auth-init',
  failureRedirect: '/'
  })
);

app.get('/auth/google',
  function(req, res, next) {
    if(!req.user) { //Not already logged-in, we'll continue on to authentication
      return next();
    }
    res.redirect('/#/auth-init')  //redirect to JWT setter if a user is detected
  },
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/#/auth-init',
  failureRedirect: '/'
  })
);

app.get('/auth/init', function(req, res) {
  if(!req.user) {
      res.json({error: 'Something went wrong with Google Login/Sign Up'})
    }
    var response = {};
    response.token = jwt.encode(req.user.user_id, Auth.secret);
    Users.getUserById(req.user.user_id).then(function(user) {
      if(user[0].artist_id !== null) {
        response.type = 'artist';
      } else if(user[0].venue_id !== null) {
        response.type = 'venue';
      } else {
        response.type = null;
      }
    }).then(function() {
      res.json(response);
    });
})

require('./routes.js')(app);

app.listen(port);
console.log('Server running on port:', port)