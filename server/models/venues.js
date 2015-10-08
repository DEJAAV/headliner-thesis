var Types = require('./types.js');
var Genres = require('./genres.js');
var knex = require('../db/db.js');
var Venue_Genres = require('./venue_genres.js')
var Venues_Types = require('./venues_types.js')

module.exports = {

  create: function(reqBody, userId) {
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
        for(var genre in reqBody.genre) {
          if (reqBody.genre[genre]) {
            Venue_Genres.addGenre(venueId[0], genre);
          }
        }
        for(var type in reqBody.type) {
          if (reqBody.type[type]) {
            Venues_Types.addType(venueId[0], type);
          }
        }
        return venueId[0];
      }).then(function(venueId) {
        return knex('Users').where({
          'user_id': userId
        }).update({
          'venue_id': venueId
        }).then(function() {
          return venueId;
        })
      });
  },

  update: function(reqBody) {
    return knex('Venues')
      .where({'venue_id': reqBody.venue_id})
      .returning('venue_id')
      .update({
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
        Venue_Genres.removeAll(venueId[0]).then(function() {
          for(var genre in reqBody.genre) {
            if (reqBody.genre[genre]) {
              Venue_Genres.addGenre(venueId[0], genre);
            }
          }
        });
        Venues_Types.removeAll(venueId[0]).then(function() {
          for(var type in reqBody.type) {
            if (reqBody.type[type]) {
              Venues_Types.addType(venueId[0], type);
            }
          }
        });
      });
  },

  getAll: function() {
    return knex('Genres')
      .join('Venue_Genres', 'Genres.genre_id', 'Venue_Genres.genre_id')
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
          .join('Venues_Types', 'Types.type_id', 'Venues_Types.type_id')
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
      }).then(function(genres_types) {
        return knex('Artists')
          .join('Shows', 'Artists.artist_id', 'Shows.artist_id')
          .then(function(artists_shows) {
            var shows = {};
            for (var i = 0; i < artists_shows.length; i++) {
              if (shows[artists_shows[i].venue_id]) {
                shows[artists_shows[i].venue_id].push({'artist': artists_shows[i].artist_name, 'date': artists_shows[i].date});
              } else {
                shows[artists_shows[i].venue_id] = [{'artist': artists_shows[i].artist_name, 'date': artists_shows[i].date}];
              }
            }
            return genres_types.concat(shows);
          })
      }).then(function(genres_types_shows) {
        return knex('Venue_Reviews')
          .join('Shows', 'Venue_Reviews.show_id', 'Shows.show_id')
          .join('Artists', 'Shows.artist_id', 'Artists.artist_id')
          .then(function(rsb) {
            var reviews = {};
            for (var i = 0; i < rsb.length; i++) {
              if (reviews[rsb[i].venue_id]) {
                reviews[rsb[i].venue_id].push({'artist': rsb[i].artist_name, 'show_date': rsb[i].date, 'rating': rsb[i].rating, 'comment': rsb[i].comment});
              } else {
                reviews[rsb[i].venue_id] = [{'artist': rsb[i].artist_name, 'show_date': rsb[i].date, 'rating': rsb[i].rating, 'comment': rsb[i].comment}];
              }
            }
            return genres_types_shows.concat(reviews);
          })
      }).then(function(genres_types_shows_reviews) {
        return knex('Venues').then(function(venues) {
          return venues.map(function(venue) {
            venue.genre = genres_types_shows_reviews[0][venue.venue_id];
            venue.type = genres_types_shows_reviews[1][venue.venue_id];
            venue.shows = genres_types_shows_reviews[2][venue.venue_id];
            venue.reviews = genres_types_shows_reviews[3][venue.venue_id];
            return venue;
          });
        });
      });
  },

  getVenueByUser: function(user_id) {
  var venue = {};
  //sync up and grab all information from Venues Table
  console.log('Firing the getVenueByUser function...');
  return knex('Venues').join('Users', 'Users.venue_id', 'Venues.venue_id')
    .select()
    .where({
      'Users.user_id': user_id
    }).then(function(result) {
      for(var prop in result[0]) {
        venue[prop] = result[0][prop]
      }
    }).then(function() {
      //create an array of objects with genre_name as their only prop
      return knex('Venue_Genres').join('Genres', 'Venue_Genres.genre_id', 'Genres.genre_id')
        .select('Genres.genre_name')
        .where({
          'Venue_Genres.venue_id': venue.venue_id
        })
    }).then(function(genres) {
      console.log('Genres as a result of the genres join: ', genres);
      venue.genre = {};
      for(var i = 0; i < genres.length; i++) {
        console.log('This is the ', i, ' in genres: ', genres[i]);
        for(var prop in genres) {
          venue.genre[prop] = true;
        }
      }
    }).then(function() {
      //create an array of objects with type_name as their only prop
      return knex('Venues_Types').join('Types', 'Types.type_id', 'Venues_Types.type_id')
        .select('Types.type_name')
        .where({
          'Venues_Types.venue_id': venue.venue_id
        })
    }).then(function(types) {
      console.log('Types as a result of the join table: ', types);
      venue.type = {}
      for(var i = 0; i < types.length; i++) {
        for(var prop in types) {
          venue.type[prop] = true;
        }
      }
    }).then(function() {
      console.log('venue inside of getVenueByUser: ', venue); 
      return venue;
    })
  }
};
