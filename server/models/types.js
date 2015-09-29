var knex = require('../db/db.js');

module.exports = {

  findTypeId: function(name) {
    return knex('Venue_Types')
      .where({
        type_name: name
      })
      .select('venue_type_id')
      .then(function(type){
        return type[0].venue_type_id;
      })
  }

}