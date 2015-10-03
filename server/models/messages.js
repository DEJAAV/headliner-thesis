

module.exports = {

  getBandMessages: function(band_id) {
    return knex('Requests').where({
      'band_id': band_id
    })
  },
  
  getVenueMessages: function(venue_id) {
    return knex('Requests').where({
      'venue_id': venue_id
    })
  },

  sendRequest: function(date, message, band_id, venue_id, sender, receiver){
    return knex('Requests').insert({
      'date': date,
      'message': message,
      'band_id': band_id,
      'venue_id': venue_id,
      'sender': sender,
      'receiver': receiver
    })
  }



}