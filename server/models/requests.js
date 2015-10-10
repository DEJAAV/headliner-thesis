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

  sendRequest: function(reqBody, user_id){
    return Users.getUserById(user_id)
    .then(function(user){
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

  deleteExpiredRequest: function(date) {
    return knex('Request').where({
      'date': date
    }).del()
  },

  acceptRequest: function(reqBody) {
    return knex('Requests').where({
      'date': reqBody.date,
      'artist_id': reqBody.artist_id,
      'venue_id': reqBody.venue_id
    }).del()
  }

};
