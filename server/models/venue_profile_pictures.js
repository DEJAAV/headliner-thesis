var knex = require('../db/db.js');

module.exports = {
  addPicture: function(venue_id, url) {
    return knex('Venue_Profile_Pictures')
      .insert({
        'venue_id': venue_id,
        'url': url
      })
  },
  
  removeAll: function(venue_id) {
    return knex('Venue_Profile_Pictures').where({
      'venue_id': venue_id
    }).del()
  }
}