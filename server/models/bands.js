var Band_Genres = require('./band_genres.js');
var Band_Members = require('./band_members.js');
var knex = require('../db/db.js');

module.exports = {

  create: function(reqBody) {
    return knex('Bands').returning('band_id').insert({
      band_name: reqBody.band_name,
      onTour: reqBody.onTour,
      email: reqBody.email,
      phone_number: reqBody.phone_number,
      record_label: reqBody.record_label,
      facebook: reqBody.facebook,
      youtube: reqBody.youtube,
      soundcloud: reqBody.soundcloud,
      bandcamp: reqBody.bandcamp,
      website: reqBody.website,
      bio: reqBody.bio,
      zip: reqBody.zip
    })
    .then(function(band_id) {
      for(var genre in reqBody.genre) {
        Band_Genres.addGenre(band_id[0], genre);
      }
      return band_id
    })
    .then(function(band_id){
      for (var i = 0; i < reqBody.members.length; i++) {
        Band_Members.addMember(band_id[0], reqBody.members[i]);
      }
      return band_id[0]
    })
  },


  ////////This works for everything but changing band name. Can we grab band_id from request??////////
  update: function(reqBody) {
    return knex('Bands').where({'band_name': reqBody.band_name})
    .returning('band_id').update({
      band_name: reqBody.band_name,
      onTour: reqBody.onTour,
      email: reqBody.email,
      phone_number: reqBody.phone_number,
      record_label: reqBody.record_label,
      facebook: reqBody.facebook,
      youtube: reqBody.youtube,
      soundcloud: reqBody.soundcloud,
      bandcamp: reqBody.bandcamp,
      website: reqBody.website,
      bio: reqBody.bio,
      zip: reqBody.zip
    }).then(function(band_id) {
      for(var genre in reqBody.genre) {
        if (reqBody.genre[genre] === true) {
          Band_Genres.updateGenre(band_id[0], genre);
        }
        if (reqBody.genre[genre] === false) {
          Band_Genres.deleteGenre(band_id[0], genre)
        }
      }
      return band_id
    })
    .then(function(band_id){
      for (var i = 0; i < reqBody.members.length; i++) {
        Band_Members.updateMember(band_id[0], reqBody.members[i]);
      }
      return band_id[0]
    })
  },

  findBand: function(id) {
    return knex('Bands').where({
      'band_id': id
    }).then(function(bands){
      return bands[0];
    })
  },

  getAll: function() {
    console.log('hello')
    return knex('Bands')
    .innerJoin('Band_Genres', 'Bands.band_id', 'Band_Genres.band_id')
    .innerJoin('Band_Members', 'Bands.band_id', 'Band_Members.band_id')
    .then(function(result){
      console.log(result)
      var genreArr = []
      // for (var i = 0; i < result.length; i++){
      //   console.log(result[i]["genre_id"], "id: ", i)
      //   // if (genreArr.indexOf(result[i]["genre_id"])
      // } 
      return result
    })
  }

};
