var knex = require('../db/db.js');

module.exports = {

  addReview: function(reqBody) {
    return knex('Artist_Reviews').insert({
      artist_id: reqBody.artist_id,
      show_id: reqBody.show_id,
      rating: reqBody.rating,
      comment: reqBody.comment
    })
  },

  editReview: function(reqBody) {
    return knex('Artist_Reviews').where({
      show_id: reqBody.show_id
    }).update({
      artist_id: reqBody.artist_id,
      show_id: reqBody.show_id,
      rating: reqBody.rating,
      comment: reqBody.comment
    })
  },

  deleteReview: function(reqBody) {
    return knex('Artist_Reviews').where({
      artistReview_id: reqBody.artistReview_id
    }).del()
  }

};
