exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Genres', function(table) {
      table.increments('genre_id').primary();
      table.string('genre_name');
    }),

    knex.schema.createTable('Users', function(table) {
      table.increments('user_id').primary();
      table.string('password');
      table.integer('band_id').references('band_id').inTable('Bands');
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.string('email');
      table.string('facebook_email');
      table.string('facebook_id');
      table.string('facebook_token');
      table.string('facebook_name');
      table.string('google_email');
      table.string('google_id');
    }),

    knex.schema.createTable('Bands', function(table) {
      table.increments('band_id').primary();
      table.string('band_name');
      table.string('onTour');
      table.string('zip');
      table.string('phone');
      table.string('record_label');
      table.string('facebook');
      table.string('youtube');
      table.string('soundcloud');
      table.string('bandcamp');
      table.string('website');
      table.string('bio');
      table.string('email');
      table.string('city');
      table.string('state');
      table.string('contact_name');
    }),

    knex.schema.createTable('Venues', function(table) {
      table.increments('venue_id').primary();
      table.string('venue_name');
      table.integer('capacity');
      table.string('bio');
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
      table.integer('band_id').references('band_id').inTable('Bands');
      table.string('date');
    }),

    knex.schema.createTable('Band_Reviews', function(table) {
      table.increments('bandReview_id').primary();
      table.integer('band_id').references('band_id').inTable('Bands');
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

    knex.schema.createTable('Band_Genres', function(table) {
      table.integer('band_id').references('band_id').inTable('Bands');
      table.integer('genre_id').references('genre_id').inTable('Genres');
    }),

    knex.schema.createTable('Band_Members', function(table) {
      table.increments('member_id').primary();
      table.integer('band_id').references('band_id').inTable('Bands');
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
      table.integer('band_id').references('band_id').inTable('Bands');
      table.string('date');
      table.string('message');
      table.string('band_accept');
      table.string('venue_accept');
      table.string('sender');
    }),

    knex.schema.createTable('Messages', function(table) {
      table.increments('message_id').primary();
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('band_id').references('band_id').inTable('Bands');
      table.string('date');
      table.string('message');
      table.string('sender');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Genres'),
    knex.schema.dropTable('Users'),
    knex.schema.dropTable('Bands'),
    knex.schema.dropTable('Venues'),
    knex.schema.dropTable('Shows'),
    knex.schema.dropTable('Band_Reviews'),
    knex.schema.dropTable('Venue_Reviews'),
    knex.schema.dropTable('Band_Genres'),
    knex.schema.dropTable('Band_Members'),
    knex.schema.dropTable('Venue_Genres'),
    knex.schema.dropTable('Types'),
    knex.schema.dropTable('Venues_Types'),
    knex.schema.dropTable('Requests'),
    knex.schema.dropTable('Messages')
  ]);
};
