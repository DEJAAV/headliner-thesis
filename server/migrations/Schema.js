exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Genres', function(table) {
      table.increments('genre_id').primary();
      table.string('genre_name');
    }),

    knex.schema.createTable('Users', function(table) {
      table.increments('user_id').primary();
      table.string('password');
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.string('email');
      table.string('facebook_email');
      table.string('facebook_id');
      table.string('facebook_token');
      table.string('facebook_name');
      table.string('google_email');
      table.string('google_id');
    }),

    knex.schema.createTable('Artists', function(table) {
      table.increments('artist_id').primary();
      table.string('artist_name');
      table.string('onTour');
      table.string('zip');
      table.string('phone');
      table.string('record_label');
      table.string('facebook');
      table.string('youtube');
      table.string('soundcloud');
      table.string('artistcamp');
      table.string('website');
      table.string('bio', 6000);
      table.string('email');
      table.string('city');
      table.string('state');
      table.string('contact_name');
    }),

    knex.schema.createTable('Venues', function(table) {
      table.increments('venue_id').primary();
      table.string('venue_name');
      table.integer('capacity');
      table.string('bio', 6000);
      table.string('website');
      table.string('yelp');
      table.string('contact_name');
      table.string('contact_phone');
      table.string('contact_email');
      table.string('in_out');
      table.string('facebook');
      table.string('street');
      table.string('city');
      table.string('zip');
      table.string('state');
    }),

    knex.schema.createTable('Shows', function(table) {
      table.increments('show_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('date');
    }),

    knex.schema.createTable('Artist_Reviews', function(table) {
      table.increments('artistReview_id').primary();
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.integer('show_id').references('show_id').inTable('Shows');
      table.integer('rating');
      table.string('comment');
    }),

    knex.schema.createTable('Venue_Reviews', function(table) {
      table.increments('venueReview_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('show_id').references('show_id').inTable('Shows');
      table.integer('rating');
      table.string('comment');
    }),

    knex.schema.createTable('Artist_Genres', function(table) {
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.integer('genre_id').references('genre_id').inTable('Genres');
    }),

    knex.schema.createTable('Artist_Members', function(table) {
      table.increments('member_id').primary();
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('member_name');
      table.string('title');
    }),

    knex.schema.createTable('Venue_Genres', function(table) {
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('genre_id').references('genre_id').inTable('Genres');
    }),

    knex.schema.createTable('Types', function(table) {
      table.increments('type_id').primary();
      table.string('type_name');
    }),

    knex.schema.createTable('Venues_Types', function(table) {
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('type_id').references('type_id').inTable('Types');
    }),

    knex.schema.createTable('Requests', function(table) {
      table.increments('request_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('date');
      table.string('message');
      table.string('artist_accept');
      table.string('venue_accept');
      table.string('sender');
      table.boolean('read');
    }),

    knex.schema.createTable('Messages', function(table) {
      table.increments('message_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('date');
      table.string('message');
      table.string('sender');
      table.boolean('read');
    }),

    knex.schema.createTable('Songs', function(table) {
      table.increments('song_id').primary();
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('title');
      table.string('url');
    }),

    knex.schema.createTable('Artist_Gallery', function(table) {
      table.increments('picture_id').primary();
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('url');
    }),

    knex.schema.createTable('Venue_Gallery', function(table) {
      table.increments('picture_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.string('url');
    }),

    knex.schema.createTable('Artist_Profile_Pictures', function(table) {
      table.increments('picture_id').primary();
      table.integer('artist_id').references('artist_id').inTable('Artists');
      table.string('url');
    }),

    knex.schema.createTable('Venue_Profile_Pictures', function(table) {
      table.increments('picture_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.string('url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Genres'),
    knex.schema.dropTable('Users'),
    knex.schema.dropTable('Artists'),
    knex.schema.dropTable('Venues'),
    knex.schema.dropTable('Shows'),
    knex.schema.dropTable('Artist_Reviews'),
    knex.schema.dropTable('Venue_Reviews'),
    knex.schema.dropTable('Artist_Genres'),
    knex.schema.dropTable('Artist_Members'),
    knex.schema.dropTable('Venue_Genres'),
    knex.schema.dropTable('Types'),
    knex.schema.dropTable('Venues_Types'),
    knex.schema.dropTable('Requests'),
    knex.schema.dropTable('Messages'),
    knex.schema.dropTable('Songs'),
    knex.schema.dropTable('Artist_Gallery'),
    knex.schema.dropTable('Venue_Gallery'),
    knex.schema.dropTable('Artist_Profile_Pictures'),
    knex.schema.dropTable('Venue_Profile_Pictures')
  ]);
};
