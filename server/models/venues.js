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
    return knex('Venues')
      .returning('venue_id')
      .insert({
        venue_name: reqBody.venue_name,
        capacity: reqBody.capacity,
        website: reqBody.website,
        street: reqBody.street,
        bio: reqBody.about,
        city: reqBody.city,
        state: reqBody.state,
        zip: reqBody.zip,
        facebook: reqBody.facebook,
        yelp: reqBody.yelp,
        contact_name: reqBody.contact_name,
        contact_phone: reqBody.contact_phone,
        contact_email: reqBody.contact_email,
        in_out: reqBody.inout
      })
      .then(function(venueId) {
        for(var prop in reqBody.genre) {
          Venue_Genres.addGenre(venueId[0], prop);
        }
        for(var type in reqBody.type) {
          Venues_Types.addType(venueId[0], type);
        }
        return venueId[0];
      })
  },

  getAll: function() {
    return knex('Genres')
      .join("Venue_Genres", "Genres.genre_id", "Venue_Genres.genre_id")
      .then(function(venue_genres) {
        var genres = {};
        for (var i = 0; i < venue_genres.length; i++) {
          if (genres[venue_genres[i].venue_id]) {
            genres[venue_genres[i].venue_id][venue_genres[i].genre_name] = true;
          } else {
            genres[venue_genres[i].venue_id] = {};
            genres[venue_genres[i].venue_id][venue_genres[i].genre_name] = true;
          }
        }
        return genres;
      }).then(function(genres) {
        return knex('Types')
          .join("Venues_Types", "Types.type_id", "Venues_Types.type_id")
          .then(function(venues_types) {
            var types = {};
            for (var i = 0; i < venues_types.length; i++) {
              if (types[venues_types[i].venue_id]) {
                types[venues_types[i].venue_id][venues_types[i].type_name] = true;
              } else {
                types[venues_types[i].venue_id] = {};
                types[venues_types[i].venue_id][venues_types[i].type_name] = true;
              }
            }
            return [genres,types];
          })
      }).then(function(genres_and_types) {
        return knex('Venues').then(function(venues) {
          return venues.map(function(venue) {
            venue.genre = genres_and_types[0][venue.venue_id];
            venue.type = genres_and_types[1][venue.venue_id];
            return venue;
          });
        });
      });
  }

};
