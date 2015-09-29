var Types = require('./types.js');
var knex = require('../db/db.js');

module.exports = {

  getTypes: function(venue_id) {
    return knex('Venues_Types')
      .where({'venue_id': venue_id})
      .select()
  },

  addType: function(venue_id, type) {
    Types.findTypeId(type).then(function(type_id) {
      return knex('Venues_Types').insert({
        'type_id': type_id,
        'venue_id': venue_id
      })
    })
  },

  updateType: function(venue_id, type) {
    Types.findTypeId(type).then(function(type_id) {
      return knex('Venues_Types').update({
        'type_id': type_id,
        'venue_id': band_id
      })
    })
  }

};