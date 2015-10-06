var knex = require('../db/db.js');

module.exports = {

  getMessages: function(reqBody, reqUser) {
    if (reqBody.sender = 'artist') {
      return knex('Messages').where({
        'band_id': reqUser[band_id];
      })
      .join('Venue','Messages.venue_id','Venues.venue_id')
      .then(function(messages) {
        var venues = {};
        messages.forEach(function(message) {
          if (!venues[message.venue_name] || venues[message.venue_name] < message.date) {
            venues[message.venue_name] = message.date;
          }
        });
        return venues;
      });
    } else if (reqBody.sender = 'venue') {
      return knex('Messages').where({
        'venue_id': reqUser[venue_id]
      })
      .join('Band','Messages.band_id','Bands.band_id')
      .then(function(messages) {
        var bands = {};
        messages.forEach(function(message) {
          if (!bands[message.band_name] || bands[message.band_name] < message.date) {
            bands[message.band_name] = message.date;
          }
        });
        return bands;
    });
  },

  getConversations: function(reqBody, reqUser) {
    var sender = reqBody.sender + '_id';
    var band_id = reqBody.band_id || reqUser[sender];
    var venue_id = reqBody.venue_id || reqUser[sender];
    return knex('Messages').where({
      'band_id': band_id
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
