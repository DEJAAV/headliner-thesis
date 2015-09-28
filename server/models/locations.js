var knex = require('../db/db.js');

module.exports = {
  
  getLocationId: function(zipcode) {
    return knex('Locations').where({
      zipcode: zipcode
    }).then(function(locations) {
      if (!locations.length) {
        return knex('Locations').insert({
          zipcode: zipcode
        }).returning('location_id').then(function(id){
          return id[0]
        });
      } else {
        return locations[0].location_id;
      }
    })
  }
};