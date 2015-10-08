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
              return venue.name;
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
              return band.name;
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
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].band_id) {
        return knex('Bands')
        .join('Messages','Bands.band_id','Messages.band_id')
        .join('Venues','Messages.venue_id','Venues.venue_id')
        .then(function(messages) {
          var venues = [];
          messages.forEach(function(message) {
            if (message.band_id === user[0].band_id) {
              venues.push({'sender': message.sender === 'venue' ? message.venue_name : message.band_name, 
                           'reciever': message.sender === 'venue' ? message.band_name : message.venue_name, 
                           'date': message.date, 
                           'message': message.message
                         });
            }
          });
          return venues;
        });
      } else if (user[0].venue_id) {
        return knex('Venues')
        .join('Messages','Venues.venue_id','Messages.venue_id')
        .join('Bands','Messages.band_id','Bands.band_id')
        .then(function(messages) {
          var bands = [];
          messages.forEach(function(message) {
            if (message.venue_id === user[0].venue_id) {
              bands.push({'sender': message.sender === 'venue' ? message.venue_name : message.band_name, 
                          'reciever': message.sender === 'venue' ? message.band_name : message.venue_name, 
                          'date': message.date, 
                          'message': message.message
                        });
            }
          });
          return bands;
        });
      }
    })
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
