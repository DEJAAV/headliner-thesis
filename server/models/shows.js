module.exports = function(){
  return {

    addShow: function(reqBody){
      return knex('Shows').insert({
        venue_id: reqBody.venue_id,
        band_id: reqBody.band_id,
        date: reqBody.date
      })
    },

    updateShow: function(reqBody){
      return knex('Show').where({
        show_id: reqBody.show_id
      }).update({
        venue_id: reqBody.venue_id,
        band_id: reqBody.band_id,
        date: reqBody.date
      })
    },

    cancelShow: function(reqBody){
      return knex('Show').where{(
        show_id: reqBody.show_id
        )}.del()
    }

  }
}