var Band_Genres = require('./band_genres.js');
var Band_Members = require('./band_members.js');
var Locations = require('./locations.js');
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
      bio: reqBody.bio
    })
    .then(function(band_id) {
      module.exports.addLocation(band_id[0],reqBody.location);
      for (var genre in reqBody.genres) {
        Band_Genres.addGenre(band_id[0], genre);
      }
      for (var member in reqBody.members) {
        Band_Members.addMember(band_id[0], member);
      }
      return band_id[0];
    })
  },

  update: function(reqBody) {
    return knex('Bands').where({'band_id': reqBody.band_id}).update({
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
      bio: reqBody.bio
    }).then(function(bandId) {
      module.exports.updateLocation(bandId,reqBody.location);
      for (var genre in reqBody.genre) {
        Band_Genres.updateGenre(bandId, genre);
      }
      for (var member in reqBody.members) {
        Band_Members.updateMember(bandId, member);
      }
    })
  },

  addLocation: function(band_id, zipcode) {
    return Locations.getLocationId(zipcode).then(function(location_id) {
      knex('Bands').where({'band_id': band_id})
      .insert({'location_id': location_id})
    })
  },

  updateLocation: function(band_id, zipcode) {
    return Locations.getLocationId(zipcode).then(function(location_id) {
      knex('Bands').where({'band_id': band_id})
      .update({'location_id': location_id})
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
    return knex('Bands')
  }

};
