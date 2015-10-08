var knex = require('../db/db.js');
var Users = require('./users.js');

module.exports = {

  getRequests: function(user_id) {
    return Users.getUserById(user_id)
    .then(function(user) {
      if (user[0].band_id) {
        return knex('Requests').where({
          'band_id': user[0].band_id
        })
      } else {
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
      console.log(user[0].band_id, "band_id")
      if (user[0].venue_id) {
        return knex('Requests').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'band_id': reqBody.band_id,
          'venue_id': user[0].venue_id,
          'sender': 'venue',
          'venue_accept': 'true'
        })
      } else {
        return knex('Requests').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'band_id': user[0].band_id,
          'venue_id': reqBody.venue_id,
          'sender': 'band',
          'band_accept': 'true'
        })
      }
    })
  },

  acceptRequestBand: function(date, band_id, venue_id) {
    return knex('Requests').where({
      'date': date,
      'band_id': band_id,
      'venue_id': venue_id
    }).insert({
      'band_accept': 'true'
    })
  },

  acceptRequestVenue: function (date, band_id, venue_id) {
    return knex('Requests').where({
      'date': date,
      'band_id': band_id,
      'venue_id': venue_id
    }).insert({
      'venue_accept': 'true'
    })
  }
};
