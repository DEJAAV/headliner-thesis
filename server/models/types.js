var knex = require('../db/db.js');

module.exports = {

  findTypeId: function(name) {
    return knex('Types')
      .where({
        type_name: name
      })
      .then(function(type){
        return type[0].type_id;
      })
  }

}