var knex = require('../db/db.js');

module.exports = {
  addPicture: function(venue_id, url) {
    return knex('Venue_Gallery')
      .insert({
        'venue_id': venue_id,
        'url': url
      })
  },

  removeOne: function(venue_id, url) {
    return knex('Venue_Gallery').where({
      'venue_id': venue_id,
      'url': url
    }).del()
  },

  removeAll: function(venue_id) {
    return knex('Venue_Gallery').where({
      'venue_id': venue_id
    }).del()
  }
}