var knex = require('../db/db.js');

module.exports = {

  addReview: function(reqBody) {
    return knex('Venue_Reviews').insert({
      venue_id: reqBody.venue_id,
      show_id: reqBody.show_id,
      rating: reqBody.rating,
      comment: reqBody.comment
    })
  },

  editReview: function(reqBody) {
    return knex('Venue_Reviews').where({
      show_id: reqBody.show_id
    }).update({
      venue_id: reqBody.venue_id,
      show_id: reqBody.show_id,
      rating: reqBody.rating,
      comment: reqBody.comment
    })
  },

  deleteReview: function(reqBody) {
    return knex('Venue_Reviews').where({
      venueReview_id: reqBody.venueReview_id
    }).del()
  }

};
