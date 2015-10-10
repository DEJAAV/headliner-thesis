var knex = require('../db/db.js');

module.exports = {

  addShow: function(reqBody){
    return knex('Shows').insert({
      venue_id: reqBody.venue_id,
      artist_id: reqBody.artist_id,
      date: reqBody.date
    })
  },

  updateShow: function(reqBody){
    return knex('Shows').where({
      show_id: reqBody.show_id
    }).update({
      venue_id: reqBody.venue_id,
      artist_id: reqBody.artist_id,
      date: reqBody.date
    })
  },

  cancelShow: function(reqBody){
    return knex('Shows').where({
      show_id: reqBody.show_id
      }).del()
  },

  deleteExpiredShows: function(date) {
    return knex('Shows').where({
      date: date
    }).del()
  },

  getShowsByArtistId: function(reqBody) {
    return knex('Shows');
  }

};
