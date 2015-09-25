module.exports = function(knex) {

	return {

		findLocationId: function(zipcode){
			return knex('Locations')
				.where({Zip_code: zipcode})
				.select(id)
		}
	}
}