exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Genres', function(table) {
      table.increments('genre_id').primary();
      table.string('genre_name');
    }),

    knex.schema.createTable('Users', function(table) {
      table.increments('user_id').primary();
      table.string('username');
      table.string('password');
      table.integer('band_id').references('band_id').inTable('Bands');
      table.integer('venue_id').references('venue_id').inTable('Venues');
    }),

    knex.schema.createTable('Bands', function(table) {
      table.increments('band_id').primary();
      table.string('band_name');
      table.string('onTour');
      table.integer('genre_id').references('genre_id').inTable('Genres');
      table.integer('location_id').references('location_id').inTable('Locations');
    }),
      
    knex.schema.createTable('Locations', function(table) {
      table.increments('location_id').primary();
      table.integer('zipcode');
    }),

    knex.schema.createTable('Venues', function(table) {
      table.increments('venue_id').primary();
      table.string('venue_name');
      table.integer('location_id').references('location_id').inTable('Locations');
      table.integer('genre_id').references('genre_id').inTable('Genres');
      table.integer('capacity');
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
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Genres'),
    knex.schema.dropTable('Users'),
    knex.schema.dropTable('Bands'),
    knex.schema.dropTable('Locations'),
    knex.schema.dropTable('Venues'),
    knex.schema.dropTable('Shows'),
    knex.schema.dropTable('Band_Reviews'),
    knex.schema.dropTable('Venue_Reviews')
    ])
};
