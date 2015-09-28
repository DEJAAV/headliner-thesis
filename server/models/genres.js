var knex = require('../db/db.js');

module.exports = {

  findGenreId: function(name) {
    return knex('Genres')
      .where({
        genre_name: name
      })
      .select('genre_id')
      .then(function(genre){
        return genre[0].genre_id;
      })
  }

  // create: function(name) {
  //   return knex('Genres')
  //     .insert({
  //       genre_name: name
  //     })
  // }

};
