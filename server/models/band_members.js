var knex = require('../db/db.js');

module.exports = {

  getMembers: function(band_id) {
    return knex('Band_Members')
      .where({'band_id': band_id})
      .select()
  },

  addMember: function(band_id, member, title) {
    knex('Band_Members').insert({
      'band_id': band_id,
      'member_name': member,
      'title': title
    }).then(function(){})
  },

  removeAll: function(band_id) {
    return knex('Band_Members').where({
      'band_id': band_id
    }).del()
  }

};
