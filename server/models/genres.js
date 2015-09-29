var knex = require('../db/db.js');

module.exports = {

  findGenreId: function(name) {
    return knex('Genres')
      .where({
        genre_name: name
      })
      .then(function(genre){
        return genre[0].genre_id;
      })
  },

  getGenreById: function(genre_id) {
    return knex('Genres')
      .where({
        'genre_id': genre_id
      })
      .then(function(genre){
        return genre[0];
      })
  }

};
