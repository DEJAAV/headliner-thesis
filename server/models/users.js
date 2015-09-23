module.exports = function(knex) {

  return {
    signupLocal: function(username, hashedPass) {
      return knex('users').insert({
        'username': username,
        'password': hashedPass,
      });
    },

    signupFacebook: function(username, facebookId, facebookToken) {
      return knex('users').insert({
        'username': username,
        'fb_id': facebookId,
        'fb_token': facebookToken
      });
    },

    updateFacebook: function(facebookId, facebookToken, userId) {
      return knex('users')
        .where('id', userId) 
        .update({
          'fb_id': facebookId,
          'fb_token': facebookToken
        });
    },

    addProfile: function(id, profileText){
      return knex('users')
        .where({'id': id})
        .update({'profile':profileText});
    },
    getUserByName: function(username){
      return knex('users')
        .where({'username':username})
        .select();
    },
    getUserById: function(id){
      return knex('users')
        .where({'id':id})
        .select();
    },
    getUserByFB: function(facebookId){
      return knex('users')
        .where({'fb_id':facebookId})
        .select();
    } 
  }
};
