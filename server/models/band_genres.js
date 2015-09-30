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
      console.log(genre_id, 'genre_id')
      return knex('Band_Genres').where({
        'band_id': band_id,
        'genre_id': genre_id
      })
      .then(function(band_genre){
        console.log(band_genre, 'bandgenre')
        if (band_genre.length === 0){
          return knex('Band_Genres').insert({
            'genre_id': genre_id,
            'band_id': band_id
          })
        }
      })
    })
  }

};
