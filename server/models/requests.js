var knex = require('../db/db.js');
var Users = require('./users.js');

module.exports = {

  getRequests: function(user_id) {
    Users.getUserById(user_id)
    .then(function(user) {
      console.log(user[0].band_id, 'user')
      if (user[0].band_id) {
        return knex('Requests').where({
          'band_id': user[0].band_id
        }).select()
      } else {
        return knex('Requests').where({
          'venue_id': user[0].venue_id
        }).select()
      }
    })
  },
  
  // getVenueRequests: function(venue_id) {
  //   return knex('Requests').where({
  //     'venue_id': venue_id
  //   })
  // },

  sendRequest: function(reqBody, reqUser){
    var sender = reqBody.sender + '_id'
    return knex('Requests').insert({
      'date': reqBody.date,
      'message': reqBody.message,
      'band_id': reqBody.band_id || reqUser[sender],
      'venue_id': reqBody.venue_id || reqUser[sender],
      'sender': reqBody.sender
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
