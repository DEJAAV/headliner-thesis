var Genres = require('./genres.js');
var knex = require('../db/db.js');

module.exports = {

  getGenres: function(artist_id) {
    return knex('Artist_Genres')
      .where({'artist_id': artist_id})
      .select()
  },

  addGenre: function(artist_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Artist_Genres').insert({
        'genre_id': genre_id,
        'artist_id': artist_id
      })
    })
  },

  removeAll: function(artist_id) {
    return knex('Artist_Genres').where({
      'artist_id': artist_id
    }).del()
  }

};