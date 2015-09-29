var Types = require('./types.js');
var Genres = require('./genres.js');
var knex = require('../db/db.js');
var Venue_Genres = require('./venue_genres.js')
var Venues_Types = require('./venues_types.js')

module.exports = {

  addGenre: function(venueId, genreName) {
    Genres.findGenreId(genreName)
      .then(function(genreId) {
        return knex('Venues_Genres')
          .insert({
            genre_id: genre_id,
            venue_id: venueId
          });
      })
  },

  addType: function(venueId, typeName) {
    Types.findTypeId(typeName)
      .then(function(typeId) {
        return knex('Venues_Types')
          .insert({
            type_id: typeId,
            venue_id: venueId
          });
      })
  },

  create: function(reqBody) {
    // console.log('inside create', reqBody)
    return knex('Venues')
      .returning('venue_id')
      .insert({
        name: reqBody.name,
        capacity: reqBody.capacity,
        website: reqBody.website,
        street: reqBody.street,
        bio: reqBody.about,
        city: reqBody.city,
        state: reqBody.state,
        zip: reqBody.zip,
        facebook: reqBody.facebook,
        yelp: reqBody.yelp,
        contact_name: reqBody.contact,
        contact_phone: reqBody.phone,
        contact_email: reqBody.email,
        in_out: reqBody.inout
      })
      .then(function(venueId) {
        for(var prop in reqBody.genres) {
          Venue_Genres.addGenre(venueId, prop);
        }
        for(var type in reqBody.type) {
          Venues_Types.addType(venueId, type);
        }
        console.log(reqBody)
      })
  },

  getAll: function() {
    return knex('Venues')
  }

};
