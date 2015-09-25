module.exports = {
    signupLocal: function(username, hashedPass) {
      return knex('Users').insert({
        'username': username,
        'password': hashedPass,
      });
    },

    signupFacebook: function(username, facebookId, facebookToken) {
      return knex('Users').insert({
        'username': username,
        'fb_id': facebookId,
        'fb_token': facebookToken
      });
    },

    updateFacebook: function(facebookId, facebookToken, userId) {
      return knex('Users')
        .where('id', userId) 
        .update({
          'fb_id': facebookId,
          'fb_token': facebookToken
        });
    },

    addProfile: function(id, profileText){
      return knex('Users')
        .where({'id': id})
        .update({'profile':profileText});
    },
    getUserByName: function(username){
      return knex('Users')
        .where({'username':username})
        .select();
    },
    getUserById: function(id){
      return knex('Users')
        .where({'id':id})
        .select();
    },
    getUserByFB: function(facebookId){
      return knex('Users')
        .where({'fb_id':facebookId})
        .select();
    } 
  
};
