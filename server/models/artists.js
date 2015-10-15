var Artist_Genres = require('./artist_genres.js');
var Artist_Members = require('./artist_members.js');
var Songs = require('./songs.js');
var knex = require('../db/db.js');

module.exports = {

  create: function(reqBody, userId) {
    console.log('We are creating an artist...')
    return knex('Artists')
      .returning('artist_id')
      .insert({
        artist_name: reqBody.artist_name, 
        onTour: reqBody.onTour,
        email: reqBody.email, 
        phone: reqBody.phone, 
        record_label: reqBody.record_label,
        facebook: reqBody.facebook,
        youtube: reqBody.youtube,
        soundcloud: reqBody.soundcloud,
        artistcamp: reqBody.artistcamp,
        website: reqBody.website,
        bio: reqBody.bio,
        zip: reqBody.zip, 
        city: reqBody.city,
        state: reqBody.state, 
        contact_name: reqBody.contact_name 
      }).then(function(artist_id) {
        console.log('This is the artist id...   ', artist_id);
        for(var genre in reqBody.genre) {
          if (reqBody.genre[genre]) {
            Artist_Genres.addGenre(artist_id[0], genre);
          }
        }
      return artist_id
    }).then(function(artist_id) {
      console.log('Adding members...');
      for (var member in reqBody.member) {
        Artist_Members.addMember(artist_id[0], member, reqBody.member[member] )
      }
      return artist_id[0]
    }).then(function(artistId) {
      return knex('Users').where({
        'user_id': userId
      }).update({
        'artist_id': artistId
      }).then(function() {
        if(reqBody.songs) {
          for(var i = 0; i < reqBody.songs.length; i++) {
            Songs.addSong(reqBody.songs[i], artistId);
          }
        }
      }).then(function() {
        if(reqBody.profile_pic) {
          return knex('Artist_Profile_Pictures')
            .insert({
              'artist_id': artistId,
              'url': reqBody.profile_pic
            })
        }
      })
    })
  },
  
  update: function(reqBody) {
    return knex('Artists')
      .where({'artist_id': reqBody.artist_id})
      .returning('artist_id')
      .update({
        artist_name: reqBody.artist_name, 
        onTour: reqBody.onTour,
        email: reqBody.email, 
        phone: reqBody.phone, 
        record_label: reqBody.record_label,
        facebook: reqBody.facebook,
        youtube: reqBody.youtube,
        soundcloud: reqBody.soundcloud,
        artistcamp: reqBody.artistcamp,
        website: reqBody.website,
        bio: reqBody.bio,
        zip: reqBody.zip, 
        city: reqBody.city,
        state: reqBody.state, 
        contact_name: reqBody.contact_name 
      }).then(function(artist_id) {
        Artist_Genres.removeAll(artist_id[0]).then(function() {
          for(var genre in reqBody.genre) {
            if (reqBody.genre[genre]) {
              Artist_Genres.addGenre(artist_id[0], genre);
            }
          }
        });
        Artist_Members.removeAll(artist_id[0]).then(function() {
          for (var member in reqBody.member) {
            Artist_Members.addMember(artist_id[0], member, reqBody.member[member]);
          }
        });
      });
  },
  
  //builds an array of all artists
  getAll: function() {
    return knex('Genres')
      .join('Artist_Genres','Genres.genre_id','Artist_Genres.genre_id')
      .then(function(artist_genres) {
        var genres = {};
        for (var i = 0; i < artist_genres.length; i++) {
          if (genres[artist_genres[i].artist_id]) {
            genres[artist_genres[i].artist_id][artist_genres[i].genre_name] = true;
          } else {
            genres[artist_genres[i].artist_id] = {};
            genres[artist_genres[i].artist_id][artist_genres[i].genre_name] = true;
          }
        }
        return genres;
    }).then(function(genres) {
      return knex('Artist_Members')
        .then(function(artistMembers) {
          var members = {}
          for (var i = 0; i < artistMembers.length; i++) {
            if (members[artistMembers[i].artist_id]) {
              members[artistMembers[i].artist_id][artistMembers[i].member_name] = artistMembers[i].title;
            } else{
              members[artistMembers[i].artist_id] = {}
              members[artistMembers[i].artist_id][artistMembers[i].member_name] = artistMembers[i].title;
            }
          }
          return [genres, members];
      }).then(function(genres_artistMembers) {
        return knex('Venues')
          .join('Shows', 'Venues.venue_id','Shows.venue_id')
          .then(function(venues_shows) {
            var shows = {};
            for (var i = 0; i < venues_shows.length; i++) {
              if (shows[venues_shows[i].artist_id]) {
                shows[venues_shows[i].artist_id].push({
                  'venue': venues_shows[i].venue_name,
                  'date': venues_shows[i].date
                });
              } else {
                shows[venues_shows[i].artist_id] = [{
                  'venue': venues_shows[i].venue_name,
                  'date': venues_shows[i].date
                }]
              }
            }
            return genres_artistMembers.concat(shows);
          })
      }).then(function(genres_artistMembers_shows) {
        return knex('Artist_Reviews')
          .join('Shows','Artist_Reviews.show_id', 'Shows.show_id')
          .join('Venues','Shows.venue_id', 'Venues.venue_id')
          .then(function(rsv) {
            var reviews = {};
            for (var i = 0; i < rsv.length; i++) {
              if (reviews[rsv[i].artist_id]) {
                reviews[rsv[i].artist_id].push({
                  'venue': rsv[i].venue_name,
                  'shows-date': rsv[i].date,
                  'rating': rsv[i].rating,
                  'comment': rsv[i].comment
                });
              } else {
                reviews[rsv[i].artist_id] = [{
                  'venue': rsv[i].venue_name,
                  'shows-date': rsv[i].date,
                  'rating': rsv[i].rating,
                  'comment': rsv[i].comment
                }];
              }
            }
            return genres_artistMembers_shows.concat(reviews);
          })
      }).then(function(genres_artistMembers_shows_reviews) {
        return knex('Artist_Profile_Pictures')
          .join('Artists', 'Artist_Profile_Pictures.artist_id', 'Artists.artist_id')
          .then(function(pics) {
            var pictures = {};
            for (var i = 0; i < pics.length; i++) {
              pictures[pics[i].artist_id] = pics[i].url;
            }
            return genres_artistMembers_shows_reviews.concat(pictures);
          })
      }).then(function(genres_artistMembers_shows_reviews_pictures) {
        return knex('Songs')
          .join('Artists', 'Artists.artist_id', 'Songs.artist_id')
          .then(function(playlist) {
            var songs = {};
            for(var i = 0; i < playlist.length; i++) {
              if(songs[playlist[i].artist_id]) {
                songs[playlist[i].artist_id].push({
                  'title': playlist[i].title,
                  'url': playlist[i].url
                })
              } else {
                songs[playlist[i].artist_id] = [{
                  'title': playlist[i].title,
                  'url': playlist[i].url
                }]
              }
            }
            return genres_artistMembers_shows_reviews.concat(songs);
          })
      }).then(function(genres_artistMembers_shows_reviews_pictures_songs) {
        return knex('Artists').then(function(artists) {
          return artists.map(function(artist) {
            artist.genre = genres_artistMembers_shows_reviews_pictures_songs[0][artist.artist_id];
            artist.members = genres_artistMembers_shows_reviews_pictures_songs[1][artist.artist_id];
            artist.shows = genres_artistMembers_shows_reviews_pictures_songs[2][artist.artist_id];
            artist.reviews = genres_artistMembers_shows_reviews_pictures_songs[3][artist.artist_id];
            artist.profile_pic = genres_artistMembers_shows_reviews_pictures_songs[4][artist.artist_id];
            artist.songs = genres_artistMembers_shows_reviews_pictures_songs[5][artist.artist_id];
            return artist;
          })
        })
      })
    })
  },

  getArtistByUser: function(user_id) {
    var artist = {};
    return knex('Artists').join('Users', 'Users.artist_id', 'Artists.artist_id')
      .select()
      .where({
        'Users.user_id': user_id
      }).then(function(result) {
        for(var prop in result[0]) {
          artist[prop] = result[0][prop]
        }
      }).then(function() {
        return knex('Artist_Genres').join('Genres', 'Artist_Genres.genre_id', 'Genres.genre_id')
          .select('Genres.genre_name')
          .where({
            'Artist_Genres.artist_id': artist.artist_id
          })
      }).then(function(genres) {
        console.log('Genres in getArtistByUser: ', genres);
        artist.genre = {};
        for(var i = 0; i < genres.length; i++) {
          for(var prop in genres[i]) {
            artist.genre[prop] = true;
          }
        }
      }).then(function() {
        artist.members = [];
        Artist_Members.getMembers(artist.artist_id)
          .then(function(artists) {
            for(var i = 0; i < artists.length; i++) {
              artist.members.push(artists[i]);
            }
          })
      }).then(function() {
        return artist;
      })
  }

};
