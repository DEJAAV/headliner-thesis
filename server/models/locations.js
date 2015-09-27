var knex = require('../db/db.js');

module.exports = {

	getLocationId: function(zipcode) {
    if (knex('Locations').where({zipcode: zipcode})) {
  		return knex('Locations')
  			.where({zipcode: zipcode})
  			.select('location_id');
    } else {
      return knex('Locations')
        .insert({zipcode: zipcode})
        .returning('location_id');
    }
	}

};
