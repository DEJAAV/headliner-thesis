var Genres = require('./genres.js');
var Locations = require('./locations.js');
var knex = require('../db/db.js');

module.exports = {

  getAll: function() {
    return knex('Bands').select()
  },

  addLocation: function(band_id, zipcode) {
    Locations.getLocationId(zipcode).then(function(location_id) {
      knex('Bands').where({'band_id': band_id})
      .insert({'location_id': location_id})
    })
  },

  addBandMember: function(band_id, member_name, title) {
    return knex('Band_Members').insert({
      'band_id': band_id,
      'member_name': member_name,
      'title': title
    })
  },

  addGenre: function(band_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Band_Genres').insert({
        'genre_id': genre_id,
        'band_id': band_id
      })
    })
  },

  create: function(reqBody) {

    return knex('Bands').insert({
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
      module.exports.addLocation(bandId,reqBody.location);
      for (var genre in reqBody.genre) {
        this.addGenre(bandId, genre)
      }
      for (var band_member in reqBody.band_member) {
        this.addBandMember(bandId, band_member, reqBody.band_member[
          band_member])
      }
    })
  },

  updateLocation: function(zipcode) {
    Locations.getLocationId(zipcode).then(function(location_id) {
      return knex('Bands').update({
        'location_id': location_id
      })
    })
  },

  updateBandMember: function(band_id, member_name, title) {
    return knex('Band_Members').update({
      'band_id': band_id,
      'member_name': member_name,
      'title': title
    })
  },

  updateGenre: function(band_id, genre) {
    Genres.findGenreId(genre).then(function(genre_id) {
      return knex('Band_Genres').update({
        'genre_id': genre_id,
        'band_id': band_id
      })
    })
  },

  update: function(reqBody) {
    this.updateLocation(reqBody.location);
    return knex('Bands').returning('band_id').update({
      band_name: reqBody.band_name,
      onTour: reqBody.onTour,
      location_id: reqBody.location_id,
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
      for (var genre in reqBody.genre) {
        this.updateGenre(bandId, genre)
      }
      for (var band_member in reqBody.band_member) {
        this.updateBandMember(bandId, band_member, reqBody.band_member[
          band_member])
      }
    })
  },

  findBand: function(id) {
    return knex('Bands').where({
      'band_id': id
    })
  },

  addShow: function(band_id, venue_id, date) {
    return knex('Shows').insert({
      'band_id': band_id,
      'venue_id': venue_id,
      'date': date
    })
  }

};
