var knex = require('../db/db.js');

module.exports = {

  signupLocal: function(email, hashedPass) {
    return knex('Users').insert({
      'email': email,
      'password': hashedPass,
    });
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
      .where({'facebook_id':facebookId})
      .select();
  } 
  
};
