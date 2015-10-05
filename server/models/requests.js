var knex = require('../db/db.js');

module.exports = {

  getBandRequests: function(band_id) {
    return knex('Requests').where({
      'band_id': band_id
    })
  },
  
  getVenueRequests: function(venue_id) {
    return knex('Requests').where({
      'venue_id': venue_id
    })
  },

  sendRequest: function(reqBody, reqUser){
    var sender = reqBody.sender + '_id'
    return knex('Requests').insert({
      'date': reqBody.date,
      'message': reqBody.message,
      'band_id': reqBody.band_id || reqUser[sender],
      'venue_id': reqBody.venue_id || reqUser[sender],
      'sender': reqBody.sender,
      'receiver': reqBody.receiver
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
}