var knex = require('../db/db.js');

module.exports = {
  addPicture: function(artist_id, url) {
    return knex('Artist_Gallery')
      .insert({
        'artist_id': artist_id,
        'url': url
      })
  },

  removeOne: function(artist_id, url) {
    return knex('Artist_Gallery').where({
      'artist_id': artist_id,
      'url': url
    }).del()
  },

  removeAll: function(artist_id) {
    return knex('Artist_Gallery').where({
      'artist_id': artist_id
    }).del()
  }
}