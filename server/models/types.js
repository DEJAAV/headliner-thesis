var knex = require('../db/db.js');

module.exports = {

  findTypeId: function(type) {
    return knex('Types')
      .where({
        type: type
      })
      .select('type_id')
  },

  create: function(type) {
    return knex('Types')
      .insert({
        type: type
      })
  }

}