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
    }).then(function(band_id) {
      for (var genre in reqBody.genre) {
        Band_Genres.addGenre(band_id[0], genre);
      }
      return band_id
    }).then(function(band_id) {
      for (var i = 0; i < reqBody.members.length; i++) {
        Band_Members.addMember(band_id[0], reqBody.members[i]);
      }
      return band_id[0]
    })
  },
  
  update: function(reqBody) {
    return knex('Bands').where({
      'band_id': reqBody.band_id
    }).returning('band_id').update({
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
      for (var genre in reqBody.genre) {
        if (reqBody.genre[genre] === true) {
          Band_Genres.updateGenre(band_id[0], genre);
        }
        if (reqBody.genre[genre] === false) {
          Band_Genres.deleteGenre(band_id[0], genre)
        }
      }
      return band_id
    }).then(function(band_id) {
      for (var i = 0; i < reqBody.members.length; i++) {
        Band_Members.updateMember(band_id[0], reqBody.members[i]);
      }
      return band_id[0]
    })
  },

  getAll: function() {
    return knex('Genres').join('Band_Genres', 'Genres.genre_id',
      'Band_Genres.genre_id').then(function(band_genres) {
      var genres = {};
      for (var i = 0; i < band_genres.length; i++) {
        if (genres[band_genres[i].band_id]) {
          genres[band_genres[i].band_id][band_genres[i].genre_name] =
            true;
        } else {
          genres[band_genres[i].band_id] = {};
          genres[band_genres[i].band_id][band_genres[i].genre_name] =
            true;
        }
      }
      return genres
    }).then(function(genres) {
      return knex('Band_Members').then(function(bandMembers) {
        return [genres, bandMembers]
      }).then(function(genres_bandMembers) {
        return knex('Venues').join('Shows', 'Venues.venue_id',
          'Shows.venue_id').then(function(venues_shows) {
          var shows = {};
          for (var i = 0; i < venues_shows.length; i++) {
            if (shows[venues_shows[i].band_id]) {
              shows[venues_shows[i].band_id].push({
                'venue': venues_shows[i].venue_name,
                'date': venues_shows[i].date
              });
            } else {
              shows[venues_shows[i].band_id] = [{
                'band': venues_shows[i].venue_name,
                'date': venues_shows[i].date
              }]
            }
          }
          return genres_bandMembers.concat(shows);
        })
      }).then(function(genres_bandMembers_shows) {
        return knex('Band_Reviews').join('Shows',
          'Band_Reviews.show_id', 'Shows.show_id').join('Venues',
          'Shows.venue_id', 'Venues.venue_id').then(function(rsv) {
          var reviews = {};
          for (var i = 0; i < rsv.length; i++) {
            if (reviews[rsv[i].band_id]) {
              reviews[rsv[i].band_id].push({
                'venue': rsv[i].venue_name,
                'shows-date': rsv[i].date,
                'rating': rsv[i].rating,
                'comment': rsv[i].comment
              });
            } else {
              reviews[rsv[i].band_id] = [{
                'venue': rsv[i].venue_name,
                'shows-date': rsv[i].date,
                'rating': rsv[i].rating,
                'comment': rsv[i].comment
              }];
            }
          }
          return genres_bandMembers_shows.concat(reviews);
        })
      }).then(function(genres_bandMembers_shows_reviews) {
        return knex('Bands').then(function(bands) {
          return bands.map(function(band) {
            band.genre = genres_bandMembers_shows_reviews[0][band.band_id]

            band.bandMembers = []
            for (var i = 0; i < genres_bandMembers_shows_reviews[1].length; i++) {
              var memberObj = {}
              if (genres_bandMembers_shows_reviews[1][i].band_id === band.band_id) {
                memberObj[genres_bandMembers_shows_reviews[1][i].member_name] = genres_bandMembers_shows_reviews[1][i].title;
                band.bandMembers.push(memberObj)
              }
            }
            band.shows = genres_bandMembers_shows_reviews[2][band.band_id]
            band.reviews = genres_bandMembers_shows_reviews[3][band.band_id]
            return band
          })
        })
      })
    })
  }
};
