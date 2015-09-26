var knex = require('../db/db.js');

module.exports = {

	findLocationId: function(zipcode){
		return knex('Locations')
			.where({Zip_code: zipcode})
			.select(id)
	}

};
