//Songs table
var knex = require('../db/db.js');

module.exports = {
  getSongsByArtist: function(artist_id) {
    knex('Songs').select()
      .where({
        'artist_id': artist_id
      })
  },

  getSongsByUser: function(user_id) {
    knex('Users').join('Songs', 'Songs.artist_id', 'Users.artist_id')
      .select('Songs.*')
      .where({'Users.user_id': user_id})
  }
}