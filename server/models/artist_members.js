var knex = require('../db/db.js');

module.exports = {

  getMembers: function(artist_id) {
    return knex('Artist_Members')
      .where({'artist_id': artist_id})
      .select()
  },

  addMember: function(artist_id, member, title) {
    knex('Artist_Members').insert({
      'artist_id': artist_id,
      'member_name': member,
      'title': title
    }).then(function(){})
  },

  removeAll: function(artist_id) {
    return knex('Artist_Members').where({
      'artist_id': artist_id
    }).del()
  }
};
