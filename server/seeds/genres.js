'use strict'
var Genres = require('../models/genres.js');
var Types = require('../models/types.js');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('Genres').del(),
    knex('Types').del(),

    // Inserts seed entries
    knex('Genres').insert({genre_id: 1, genre_name: 'Americana'}),
    knex('Genres').insert({genre_id: 2, genre_name: 'Blues'}),
    knex('Genres').insert({genre_id: 3, genre_name: 'Bluegrass'}),
    knex('Genres').insert({genre_id: 4, genre_name: 'Classical'}),
    knex('Genres').insert({genre_id: 5, genre_name: 'Comedy'}),
    knex('Genres').insert({genre_id: 6, genre_name: 'Country'}),
    knex('Genres').insert({genre_id: 7, genre_name: 'Coverband'}),
    knex('Genres').insert({genre_id: 8, genre_name: 'DJ'}),
    knex('Genres').insert({genre_id: 9, genre_name: 'EDM'}),
    knex('Genres').insert({genre_id: 10, genre_name: 'Electronic'}),
    knex('Genres').insert({genre_id: 11, genre_name: 'Folk'}),
    knex('Genres').insert({genre_id: 12, genre_name: 'Hiphop'}),
    knex('Genres').insert({genre_id: 13, genre_name: 'Jazz'}),
    knex('Genres').insert({genre_id: 14, genre_name: 'Latin'}),
    knex('Genres').insert({genre_id: 15, genre_name: 'Metal'}),
    knex('Genres').insert({genre_id: 16, genre_name: 'Pop'}),
    knex('Genres').insert({genre_id: 17, genre_name: 'RnB'}),
    knex('Genres').insert({genre_id: 18, genre_name: 'Rock'}),
    knex('Genres').insert({genre_id: 19, genre_name: 'SpokenWord'}),
    knex('Genres').insert({genre_id: 20, genre_name: 'World'}),

    knex('Types').insert({type_id: 1, type_name: 'Casual'}),
    knex('Types').insert({type_id: 2, type_name: 'Beer'}),
    knex('Types').insert({type_id: 3, type_name: 'Champagne'}),
    knex('Types').insert({type_id: 4, type_name: 'Cocktail'}),
    knex('Types').insert({type_id: 5, type_name: 'Country'}),
    knex('Types').insert({type_id: 6, type_name: 'Dance'}),
    knex('Types').insert({type_id: 7, type_name: 'Dive'}),
    knex('Types').insert({type_id: 8, type_name: 'LGBT'}),
    knex('Types').insert({type_id: 9, type_name: 'Hookah'}),
    knex('Types').insert({type_id: 10, type_name: 'Irish'}),
    knex('Types').insert({type_id: 11, type_name: 'Jazz'}),
    knex('Types').insert({type_id: 12, type_name: 'Karoke'}),
    knex('Types').insert({type_id: 13, type_name: 'Coffee'}),
    knex('Types').insert({type_id: 14, type_name: 'Lounge'}),
    knex('Types').insert({type_id: 15, type_name: 'Music'}),
    knex('Types').insert({type_id: 16, type_name: 'Piano'}),
    knex('Types').insert({type_id: 17, type_name: 'Wine'})

  );
};
