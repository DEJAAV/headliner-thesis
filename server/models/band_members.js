var knex = require('../db/db.js');

module.exports = {

  getMembers: function(band_id) {
    return knex('Band_Members')
      .where({'band_id': band_id})
      .select()
  },

  addMember: function(band_id, member, title) {
    return knex('Band_Members').insert({
      'band_id': band_id,
      'member_name': member,
      'title': title
    }).then(function(band){
    })
  },

  updateMember: function(band_id, member, title) {
    return knex('Band_Members').where({
      'band_id': band_id
    }).del()
    .then(function(){
      return knex('Band_Members').insert({
        'band_id': band_id,
        'member_name': member,
        'title': title
    }).then(function(band){
    })
    })
    // return knex('Band_Members').update({
    //   'band_id': band_id,
    //   'member_name': member.name,
    //   'title': member.title
    // }).then(function(band){
    // })
  }

};
