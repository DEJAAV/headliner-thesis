var knex = require('../db/db.js');
var Users = require('./users.js');

module.exports = {

  getRequests: function(user_id) {
    return Users.getUserById(user_id)
    .then(function(user) {
      console.log(user, 'user')
      if (user[0].artist_id) {
        return knex('Requests').where({
          'artist_id': user[0].artist_id
        })
      } else if (user[0].venue_id){
        return knex('Requests').where({
          'venue_id': user[0].venue_id
        })
      }
    })
  },
  
  // getVenueRequests: function(venue_id) {
  //   return knex('Requests').where({
  //     'venue_id': venue_id
  //   })
  // },

  sendRequest: function(reqBody, user_id){
    console.log(reqBody, 'reqBody')
    return Users.getUserById(user_id)
    .then(function(user){
      console.log(user, "useruser")
      console.log(user[0].artist_id, "artist_id")
      console.log(user[0].venue_id, 'venueid')
      if (user[0].venue_id) {
        return knex('Requests').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'artist_id': reqBody.artist_id,
          'venue_id': user[0].venue_id,
          'sender': 'venue',
          'venue_accept': 'true'
        })
      } else if (user[0].artist_id){
        return knex('Requests').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'artist_id': user[0].artist_id,
          'venue_id': reqBody.venue_id,
          'sender': 'artist',
          'artist_accept': 'true'
        })
      }
    })
  },

  acceptRequestArtist: function(date, artist_id, venue_id) {
    return knex('Requests').where({
      'date': date,
      'artist_id': artist_id,
      'venue_id': venue_id
    }).insert({
      'artist_accept': 'true'
    })
  },

  acceptRequestVenue: function (date, artist_id, venue_id) {
    return knex('Requests').where({
      'date': date,
      'artist_id': artist_id,
      'venue_id': venue_id
    }).insert({
      'venue_accept': 'true'
    })
  }
};
