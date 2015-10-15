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
var Auth = (process.env.NODE_ENV === 'production') ? require('./auth.js') : require('./localauth.js');
var Users = require('./models/users.js');
var Venues = require('./models/venues.js');
var Artists = require('./models/artists.js');

//db
var knex = require('knex')(Auth.pgData);

// s3 file upload
var aws = require('aws-sdk');

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

//end points for s3 testing
app.get('/sign_s3', function(req, res){
    aws.config.update({
      accessKeyId: Auth.AWS.accessKey, 
      secretAccessKey: Auth.AWS.secretKey
    });
    aws.config.update({
      region: 'us-west-2', 
      signatureVersion: 'v4' 
    });

    var s3 = new aws.S3();
    var s3_params = {
        Bucket: Auth.AWS.bucket,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
          console.log('req.query inside of getSignedUrl: ', req.query);
            var return_data = {
                signed_request: data,
                url: 'https://s3-us-west-2.amazonaws.com/'+ Auth.AWS.bucket + req.query.file_name // check if this is the right url. Does bucket come first?
            };
            console.log('the url inside of getSignedUrl: ', return_data.url)
            res.json(return_data);
        }
    });
});

app.post('/submit_form', function(req, res){
  console.log('req body on submit form: ', req.body);
  // TODO: Return something useful or redirect
  console.log("shut the fuck up this worked")
  res.send('success');
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
        response.category = 'artist';
        Artists.getArtistByUser(req.user.user_id).then(function(artist) {
          for(var prop in artist) {
            response[prop] = artist[prop]
          }
          res.json(response);
        })
      } else if(user[0].venue_id !== null) {
        response.category = 'venue';
        Venues.getVenueByUser(req.user.user_id).then(function(venue) {
          for(var prop in venue) {
            response[prop] = venue[prop];
          }
          res.json(response);
        })
      } else {
        response.category = null;
        res.json(response);
      }
    })
})

require('./routes.js')(app);

app.listen(port);
console.log('Server running on port:', port)
