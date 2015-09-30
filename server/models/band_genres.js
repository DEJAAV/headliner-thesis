var Genres = require('./genres.js');
var knex = require('../db/db.js');

module.exports = {

  getGenres: function(band_id) {
    return knex('Band_Genres')
      .where({'band_id': band_id})
  },

  addGenre: function(band_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Band_Genres').insert({
        'genre_id': genre_id,
        'band_id': band_id
      })
    })
  },

  deleteGenre: function(band_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Band_Genres').where({
        'genre_id': genre_id
      }).del()
    })
  },

  updateGenre: function(band_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Band_Genres').where({
        'band_id': band_id
      })
      .then(function(band_genre){
        if (!band_genre.length){
          return knex('Band_Genres').insert({
            'genre_id': genre_id,
            'band_id': band_id
          })
        }
      })
    })
  }

};
