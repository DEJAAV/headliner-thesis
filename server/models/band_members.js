var knex = require('../db/db.js');

module.exports = {

  getMembers: function(band_id) {
    return knex('Band_Members')
      .where({'band_id': band_id})
      .select()
  },

  addMember: function(band_id, member) {
    return knex('Band_Members').insert({
      'band_id': band_id,
      'member_name': member.name,
      'title': member.title
    }).then(function(band){
    })
  },

  updateMember: function(band_id, member) {
      console.log(band_id, 'band_id')
    return knex('Band_Members').where({
      'band_id': band_id
    }).del()
    .then(function(){
      console.log(band_id, 'band_id')
      return knex('Band_Members').insert({
        'band_id': band_id,
        'member_name': member.name,
        'title': member.title
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
