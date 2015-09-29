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
      'facebook_email': username,
      'facebook_id': facebookId,
      'facebook_token': facebookToken,
      'facebook_name': facebookName
    });
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

  signupGoogle: function(profile) {
    console.log('Google Signup');
    return knex('Users').insert({
      'google_id': profile.id,
      'google_email': profile.emails[0].value
    })
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

  hashPassword: function(password) {
    var genSalt = Bluebird.promisify(bcrypt.genSalt);
    var hasher = Bluebird.promisify(bcrypt.hash);
    return genSalt(10).then(function(salt) {
      return hasher(password, salt, null);
    })
  },
  
  comparePassword: function(password, dbPassword) {
    var compare = Bluebird.promisify(bcrypt.compare);
    return compare(password, dbPassword).then(function(err, res) {
      return res;
    })
  }
};
