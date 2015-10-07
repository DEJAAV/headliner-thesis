var knex = require('../db/db.js');

module.exports = {

  getMessages: function(user_id) {
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].band_id) {
        return knex('Messages').where({
          'band_id': user[0].band_id
        })
        .join('Venues','Messages.venue_id','Venues.venue_id')
        .then(function(messages) {
          var venues = [];
          messages.forEach(function(message) {
            var names = venues.map(function(venue) {
              return venue.venue_name;
            });
            if (names.indexOf(message.venue_name) === -1) {
              venues.push({'name': message.venue_name, 'date': message.date});
            } else if (message.date > venues[names.indexOf(message.venue_name)].date) {
              venues[names.indexOf(message.venue_name)].date = message.date;
            }
          });
          return venues;
        });
      } else if (user[0].venue_id) {
        return knex('Messages').where({
          'venue_id': user[0].venue_id
        })
        .join('Bands','Messages.band_id','Bands.band_id')
        .then(function(messages) {
          var bands = [];
          messages.forEach(function(message) {
            var names = bands.map(function(band) {
              return band.band_name;
            });
            if (names.indexOf(message.band_name) === -1) {
              bands.push({'name': message.band_name, 'date': message.date});
            } else if (message.date > bands[names.indexOf(message.band_name)].date) {
              bands[names.indexOf(message.band_name)].date = message.date;
            }
          });
          return bands;
        });
      }
    })
  },

  getConversations: function(user_id) {
    var sender = reqBody.sender + '_id';
    var band_id = reqBody.band_id || reqUser[sender];
    var venue_id = reqBody.venue_id || reqUser[sender];
    return knex('Messages').where({
      'band_id': band_id,
      'venue_id': venue_id
    })
    .join('Band','Messages.band_id','Bands.band_id')
    .join('Venue','Messages.venue_id','Venues.venue_id')
    .then(function(messages) {
      var conversations = [];
      messages.forEach(function(message) {
        conversations.push({'from': message[message.sender + '_name'], 
                            'date': message.date, 
                            'message': message.message});
      });
      return conversations;
    });
  },

  sendMessage: function(reqBody, reqUser) {
    var sender = reqBody.sender + '_id'
    return knex('Messages').insert({
      'date': reqBody.date,
      'message': reqBody.message,
      'band_id': reqBody.band_id || reqUser[sender],
      'venue_id': reqBody.venue_id || reqUser[sender],
      'sender': reqBody.sender
    });
  }

};
