//Songs table
var knex = require('../db/db.js');

module.exports = {
  getSongs: function(band_id) {
    knex('Songs').select()
      .where({
        'band_id': band_id
      })
  }
}