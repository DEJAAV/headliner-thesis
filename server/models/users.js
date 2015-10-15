var knex = require('../db/db.js');
var bcrypt = require('bcrypt-nodejs');
var Bluebird = require('bluebird');

module.exports = {

  signupLocal: function(email, hashedPass) {
    return knex('Users').insert({
      'email': email,
      'password': hashedPass,
    }).returning('user_id');
  },

  signupFacebook: function(email, facebookId, facebookToken, facebookName) {
    return knex('Users').insert({
      'facebook_email': email,
      'facebook_id': facebookId,
      'facebook_token': facebookToken,
      'facebook_name': facebookName
    }).returning('user_id');
  },

  signupGoogle: function(profile) {
    console.log('Google Signup');
    return knex('Users').insert({
      'google_id': profile.id,
      'google_email': profile.emails[0].value
    }).returning('user_id');
  },

  updateFacebook: function(facebookId, facebookToken, userId) {
    return knex('Users')
      .where('user_id', userId) 
      .update({
        'facebook_id': facebookId,
        'facebook_token': facebookToken
      });
  },

  addProfile: function(id, profileText){
    return knex('Users')
      .where({'id': id})
      .update({'profile':profileText});
  },

  getUserByEmail: function(email){
    return knex('Users')
      .where({'email':email})
      .select();
  },

  getUserById: function(id){
    return knex('Users')
      .where({'user_id':id})
      .select();
  },
  
  getUserByFacebook: function(facebookId){
    return knex('Users')
      .where({'facebook_id': facebookId})
      .select();
  },

  getUserByGoogle: function(googleId) {
    return knex('Users')
      .where({'google_id': googleId})
      .select();
  },

  signInLocal: function(username, password) {
    console.log('LOCAL SIGN IN');
    return this.hashPassword(password).then(function(hash) {
      return knex('Users').select()
        .where({
          'username': username,
          'password': hash
        })
    })
  },

  updateLocal: function(reqBody) {
    return this.hashPassword(reqBody.password).then(function(hash) {
      return knex('Users')
        .where({
          'user_id': reqBody.user_id
        })
        .update({
          'password': hash
        })
    })
  },

  profile: function(req) {
    //user_id, category, venue or artist_id, shows, pending requests as sender and receiver
    var res = {};
    var userId = jwt.decode(req.headers['x-access-token'], Auth.secret);
    res.user_id = userId;
    //set category and id based off of the category
    return this.getUserById(userId).then(function(user) {
      //check if the user used local strategy
      if(user[0].facebook_id || user[0].google_id) {
        res.local = false;
      } else {
        res.local = true;
      }
      //check if the user is a venue or artist
      if(user[0].venue_id !== null) {
        res.category = 'venue';
        res.venue_id = user[0].venue_id;
      } else {
        res.category = 'artist';
        res.artist_id = user[0].artist_id;
      }
    }).then(function() {
      //get the shows based off of the category id
      if(res.category === 'artist') {
        return knex('Shows').select()
          .where({
            'artist_id': res.artist_id
          }).then(function(shows) {
            return shows;
          })
      } else {
        return knex('Shows').select()
          .where({
            'venue_id': res.venue_id
          }).then(function(shows) {
            return shows;
          })
      }
    }).then(function(shows) {
      //create shows prop for the response and push all results from previous promise
      res.shows = [];
      for(var i = 0; i < shows.length; i++) {
        res.shows.push(shows[i]);
      }
    }).then(function() {
      if(res.venue_id) {
        return knex('Venues').select()
          .where({
            'venue_id': res.venue_id
          })
      } else {
        return knex('Artists').select()
          .where({
            'artist_id': res.artist_id
          })
      }
    }).then(function(result) {
      for(var prop in result[0]) {
        if(prop === 'bio') {
          res.about = result[0][prop];
        } else if(prop !== res.category+'_id') {
          res[prop] = result[0][prop];
        }
      }
    }).then(function() {
      //venue types
      if(res.venue_id) {
        return knex('Venues_Types')
          .join('Types', 'Venues_Types.type_id', 'Types.type_id')
          .select('type_name')
          .where({
            'venue_id': res.venue_id
          }).then(function(types) {
            res.type = {};
            for(var i = 0; i < types.length; i ++) {
              for(var prop in types[i]) {
                res.type[types[i][prop]] = true;
              }
            }
          })
      } 
    }).then(function() {
      //set genres depending on category
      if(res.venue_id) {
        return knex('Venue_Genres')
          .join('Genres', 'Venue_Genres.genre_id', 'Genres.genre_id')
          .select('genre_name')
          .where({
            'venue_id': res.venue_id
          })
      } else {
        return knex('Artist_Genres')
          .join('Genres', 'Artist_Genres.genre_id', 'Genres.genre_id')
          .select('genre_name')
          .where({
            'artist_id': res.artist_id
          })
      }
    }).then(function(genres) {
      res.genre = {};
      for(var i = 0; i < genres.length; i++) {
        for(var prop in genres[i]) {
          res.genre[genres[i][prop]] = true;
        }
      }
    }).then(function() {
      //artist members placeholder for profile builder
      if(res.artist_id) {

      }
    }).then(function() {
      //reviews
      if(res.venue_id) {
        return knex('Venue_Reviews')
          .select()
          .where({
            'venue_id': res.venue_id
          })
      } else {
        return knex('Artist_Reviews')
      }
    })
  },

  hashPassword: function(password) {
    var hasher = Bluebird.promisify(bcrypt.hash);
    return hasher(password, null, null);
  },

  comparePassword: function(password, old) {
    var compare = Bluebird.promisify(bcrypt.compare);
    return compare(password, old).then(function(result) { return result; });
  }
};
