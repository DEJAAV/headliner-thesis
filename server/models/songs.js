//Songs table
var knex = require('../db/db.js');

module.exports = {
  getSongsByArtist: function(artist_id) {
    return knex('Songs').select()
      .where({
        'artist_id': artist_id
      })
  },

  getSongsByUser: function(user_id) {
    return knex('Users').join('Songs', 'Songs.artist_id', 'Users.artist_id')
      .select('Songs.*')
      .where({'Users.user_id': user_id})
  },

  addSong: function(song, artist_id) {
    return knex('Songs').insert({
      'artist_id': artist_id,
      'title': song.title,
      'url': song.url
    })
  },

  removeSong: function(artist_id, url) {
    return knex('Songs').where({
      'artist_id': artist_id,
      'url': url
    }).del()
  }
}