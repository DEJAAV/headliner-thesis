//Songs table
var knex = require('../db/db.js');

module.exports = {
  getSongsByBand: function(band_id) {
    knex('Songs').select()
      .where({
        'band_id': band_id
      })
  },

  getSongsByUser: function(user_id) {
    knex('Users').join('Songs', 'Songs.band_id', 'Users.band_id')
      .select('Songs.*')
      .where({'Users.user_id': user_id})
  }
}