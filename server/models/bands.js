var Users = require('./models/users.js');
var Genres = require('./models/genres.js');
var Locations = require('./models/locations.js');
var Shows = require('./models/shows.js')

module.exports = function(knex) {

  return {

    addLocation: function(zipcode) {
      Locations.findLocationId(zipcode)
        .then(function(location_id){
          return knex('Bands').insert({
            'location_id': location_id
          })
        })
    },

    addGenre: function(band_id, genre) {
      Genres.findGenreId(genre)
        .then(function(genre_id) {
          return knex('Band_Genres').insert({
            'genre_id': genre_id,
            'band_id': band_id
          })
        })
    },

    create: function(reqBody) {
      this.addLocation(reqBody.location);
      return knex('Bands')
        .returning('band_id')
        .insert({
          band_name: reqBody. ,
          email: reqBody. ,
          phone_number: reqBody. ,
          Record_label: reqBody. ,
          facebook_url: reqBody. ,
          soundcloud_url: reqBody. ,
          youtube_url: reqBody. ,
          website: reqBody. ,
          about_us: reqBody. ,
        })
        .then(function(bandId) {
          for (var prop in reqBody.genre) {
            this.addGenre(bandId, prop)
          }
        })
    },

    findBand: function(username) {
      return knex('Users')
        .where('Username': username)
        .select('band_id')      
    },

    addShow: function(band_id, venue_id, date) {
      return knex('Shows').insert({
        'band_id': band_id,
        'venue_id': venue_id,
        'date': date
      })
    },

    addBandMember: function(band_id, member_name, title) {
      return knex('Band_Members').insert({
        'band_id': band_id,
        'member_name': member_name,
        'title': title
      })
    },

    updateBandName: function(band_id, band_name) {
      return knex('Bands').update({
        'band_name': band_name
      }).where({
        'band_id': band_id
      })
    },

    updateEmail: function(band_id, email) {
      return knex('Bands').insert({
        'email': email
      }).where({
        'band_id': band_id
      })
    },

    updatePhone: function(band_id, phone_number) {
      return knex('Bands').insert({
        'phone_number': phone_number
      }).where({
        'band_id': band_id
      })
    },

    updateRecordLabel: function(band_id, Record_label) {
      return knex('Bands').insert({
        'Record_label': Record_label
      }).where({
        'band_id': band_id
      })
    },

    updateWebsite: function(band_id, website) {
      return knex('Bands').insert({
        'website': website
      }).where({
        'band_id': band_id
      })
    },

    updateAboutUs: function(band_id, about_us) {
      return knex('Bands').insert({
        'about_us': about_us
      }).where({
        'band_id': band_id
      })
    },


    updateFacebookUrl: function(url, band_id) {
      return knex('Bands').insert({
        'facebook_url': url
      }).where({
        'band_id': band_id
      })
    },

    updateSoundCloudUrl: function(url, band_id) {
      return knex('Bands').insert({
        'soundcloud_url': url
      }).where({
        'band_id': band_id
      })
    },

    updateYouTubeUrl: function(url, band_id) {
      return knex('Bands').update({
        'youtube_url': url
      }).where({
        'band_id': band_id
      })
    }

    // addTwitterUrl: function(url, band_id) {
    //   return knex('Bands').insert({
    //     'twitter_url': url
    //   }).where({
    //     'band_id': band_id
    //   })
    // },

    // addInstagramUrl: function(url, band_id) {
    //   return knex('Bands').insert({
    //     'instagram_url': url
    //   }).where({
    //     'band_id': band_id
    //   })
    // },




  }
};