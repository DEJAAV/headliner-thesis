var knex = require('../db/db.js');

module.exports = {

  getMessages: function(user_id) {
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].artist_id) {
        return knex('Messages').where({
          'artist_id': user[0].artist_id
        })
        .join('Venues','Messages.venue_id','Venues.venue_id')
        .then(function(messages) {
          var venues = [];
          messages.forEach(function(message) {
            var names = venues.map(function(venue) {
              return venue.name;
            });
            if (names.indexOf(message.venue_name) === -1) {
              venues.push({'name': message.venue_name,
                           'id': message.venue_id,
                           'date': message.date,
                           'unread': !message.read && message.sender === 'venue' ? 1 : 0});
            } else {
              if (message.date > venues[names.indexOf(message.venue_name)].date) {
                venues[names.indexOf(message.venue_name)].date = message.date;
              }
              if (!message.read && message.sender === 'venue') {
                venues[names.indexOf(message.venue_name)].unread++;
              }
            }
          });
          return venues;
        });
      } else if (user[0].venue_id) {
        return knex('Messages').where({
          'venue_id': user[0].venue_id
        })
        .join('Artists','Messages.artist_id','Artists.artist_id')
        .then(function(messages) {
          var artists = [];
          messages.forEach(function(message) {
            var names = artists.map(function(artist) {
              return artist.name;
            });
            if (names.indexOf(message.artist_name) === -1) {
              artists.push({'name': message.artist_name,
                            'id': message.artist_id,
                            'date': message.date,
                            'unread': !message.read && message.sender === 'artist' ? 1 : 0});
            } else {
              if (message.date > artists[names.indexOf(message.artist_name)].date) {
                artists[names.indexOf(message.artist_name)].date = message.date;
              }
              if (!message.read && message.sender === 'artist') {
                artists[names.indexOf(message.artist_name)].unread++;
              }
            }
          });
          return artists;
        });
      }
    })
  },

  getConversations: function(user_id) {
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].artist_id) {
        return knex('Artists')
        .join('Messages','Artists.artist_id','Messages.artist_id')
        .join('Venues','Messages.venue_id','Venues.venue_id')
        .then(function(messages) {
          var venues = [];
          messages.forEach(function(message) {
            if (message.artist_id === user[0].artist_id) {
              venues.push({'sender': message.sender === 'venue' ? message.venue_name : message.artist_name, 
                           'date': message.date, 
                           'message': message.message,
                           'venue_id': message.venue_id});
            }
          });
          return venues;
        });
      } else if (user[0].venue_id) {
        return knex('Venues')
        .join('Messages','Venues.venue_id','Messages.venue_id')
        .join('Artists','Messages.artist_id','Artists.artist_id')
        .then(function(messages) {
          var artists = [];
          messages.forEach(function(message) {
            if (message.venue_id === user[0].venue_id) {
              artists.push({'sender': message.sender === 'venue' ? message.venue_name : message.artist_name, 
                            'date': message.date, 
                            'message': message.message,
                            'artist_id': message.artist_id});
            }
          });
          return artists;
        });
      }
    })
  },

  sendMessage: function(reqBody, user_id) {
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].artist_id) {
        return knex('Messages').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'artist_id': user[0].artist_id,
          'venue_id': reqBody.id,
          'sender': 'artist',
          'read': false
        });
      } else if (user[0].venue_id) {
        return knex('Messages').insert({
          'date': reqBody.date,
          'message': reqBody.message,
          'artist_id': reqBody.id,
          'venue_id': user[0].venue_id,
          'sender': 'venue',
          'read': false
        });
      }
    });
  },

  markAsRead: function(reqBody, user_id) {
    return knex('Users').where({
      'user_id': user_id}).then(function(user) {
      if (user[0].artist_id) {
        return knex('Messages').where({
          'artist_id': user[0].artist_id,
          'venue_id': reqBody.id
        }).update({
          'read': true
        });
      } else if (user[0].venue_id) {
        return knex('Messages').where({
          'artist_id': reqBody.id,
          'venue_id': user[0].venue_id
        }).update({
          'read': true
        });
      }
    });
  }

};
