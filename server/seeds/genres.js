'use strict'
var Genres = require('../models/genres.js');
var Types = require('../models/types.js');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Genres').del(),
    knex('Venue_Types').del(),

    // Inserts seed entries
    knex('Genres').insert({genre_id: 1, genre_name: 'americana'}),
    knex('Genres').insert({genre_id: 2, genre_name: 'blues'}),
    knex('Genres').insert({genre_id: 3, genre_name: 'bluegrass'}),
    knex('Genres').insert({genre_id: 4, genre_name: 'classical'}),
    knex('Genres').insert({genre_id: 5, genre_name: 'comedy'}),
    knex('Genres').insert({genre_id: 6, genre_name: 'country'}),
    knex('Genres').insert({genre_id: 7, genre_name: 'coverband'}),
    knex('Genres').insert({genre_id: 8, genre_name: 'dj'}),
    knex('Genres').insert({genre_id: 9, genre_name: 'edm'}),
    knex('Genres').insert({genre_id: 10, genre_name: 'electronic'}),
    knex('Genres').insert({genre_id: 11, genre_name: 'folk'}),
    knex('Genres').insert({genre_id: 12, genre_name: 'hiphop'}),
    knex('Genres').insert({genre_id: 13, genre_name: 'jazz'}),
    knex('Genres').insert({genre_id: 14, genre_name: 'latin'}),
    knex('Genres').insert({genre_id: 15, genre_name: 'metal'}),
    knex('Genres').insert({genre_id: 16, genre_name: 'pop'}),
    knex('Genres').insert({genre_id: 17, genre_name: 'rnb'}),
    knex('Genres').insert({genre_id: 18, genre_name: 'rock'}),
    knex('Genres').insert({genre_id: 19, genre_name: 'spoken'}),
    knex('Genres').insert({genre_id: 20, genre_name: 'world'}),

    knex('Venue_Types').insert({venue_type_id: 1, type_name: 'casual'}),
    knex('Venue_Types').insert({venue_type_id: 2, type_name: 'beer'}),
    knex('Venue_Types').insert({venue_type_id: 3, type_name: 'champagne'}),
    knex('Venue_Types').insert({venue_type_id: 4, type_name: 'cocktail'}),
    knex('Venue_Types').insert({venue_type_id: 5, type_name: 'country'}),
    knex('Venue_Types').insert({venue_type_id: 6, type_name: 'dance'}),
    knex('Venue_Types').insert({venue_type_id: 7, type_name: 'dive'}),
    knex('Venue_Types').insert({venue_type_id: 8, type_name: 'gay'}),
    knex('Venue_Types').insert({venue_type_id: 9, type_name: 'hookah'}),
    knex('Venue_Types').insert({venue_type_id: 10, type_name: 'irish'}),
    knex('Venue_Types').insert({venue_type_id: 11, type_name: 'jazz'}),
    knex('Venue_Types').insert({venue_type_id: 12, type_name: 'karoke'}),
    knex('Venue_Types').insert({venue_type_id: 13, type_name: 'coffee'}),
    knex('Venue_Types').insert({venue_type_id: 14, type_name: 'lounge'}),
    knex('Venue_Types').insert({venue_type_id: 15, type_name: 'music'}),
    knex('Venue_Types').insert({venue_type_id: 16, type_name: 'piano'}),
    knex('Venue_Types').insert({venue_type_id: 17, type_name: 'wine'})

  );
};
