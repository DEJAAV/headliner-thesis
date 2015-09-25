module.exports = function(){

  return {

    addReview: function(reqBody) {
      return knex('Band_Reviews').insert({
        band_id: reqBody.band_id,
        show_id: reqBody.show_id,
        rating: reqBody.rating,
        comment: reqBody.comment
      })
    },

    editReview: function(reqBody) {
      return knex('Band_Reviews').where({
        show_id: reqBody.show_id
      }).update({
        band_id: reqBody.band_id,
        show_id: reqBody.show_id,
        rating: reqBody.rating,
        comment: reqBody.comment
      })
    },
    }

    deleteReview: function(reqBody) {
      return knex.('Band_Reviews').where({
        bandReview_id: reqBody.bandReview_id
      }).del()
    }

  }

}