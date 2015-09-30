var Genres = require('./genres.js');
var knex = require('../db/db.js');

module.exports = {

  getGenres: function(venue_id) {
    return knex('Venue_Genres')
      .where({'venue_id': venue_id})
      .select()
  },

  addGenre: function(venue_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Venue_Genres').insert({
        'genre_id': genre_id,
        'venue_id': venue_id
      })
    })
  },

  removeAll: function(venue_id) {
    return knex('Venue_Genres').where({
      'venue_id': venue_id
    }).del()
  }

};