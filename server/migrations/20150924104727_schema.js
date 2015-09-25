
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.dropColumn('genre_id');
    }),

    knex.schema.table('Bands', function(table) {
      table.dropColumn('type_id');
    }),

    knex.schema.table('Venues', function(table) {
      table.dropColumn('address');
      table.dropColumn('genre_id');
      table.string('contact_name');
      table.string('contact_phone');
      table.string('contact_email');
      table.string('in_out');
      table.string('facebook');
      table.string('street');
      table.string('city');
      table.integer('zip');
      table.string('state');
    }),

    knex.schema.dropTable('Band_Types'),

    knex.schema.createTable('Band_Genres', function(table) {
      table.integer('band_id').references('band_id').inTable('Bands');
      table.integer('genre_id').references('genre_id').inTable('Genres');
    }),

    knex.schema.createTable('Venue_Genres', function(table) {
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('genre_id').references('genre_id').inTable('Genres');
    }),

    knex.schema.createTable('Venue_Types', function(table) {
      table.integer('venue_type_id').primary();
      table.string('type_name');
    }),

    knex.schema.createTable('Venues_Types', function(table) {
      table.integer('venue_id').references('venue_id').inTable('Venues');
      table.integer('venue_type_id').references('venue_type_id').inTable('Venue_Types');
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.integer('genre_id');
    }),

    knex.schema.table('Bands', function(table) {
      table.integer('type_id');
    }),

    knex.schema.table('Venues', function(table) {
      table.string('address');
      table.integer('genre_id');
      table.dropColumn('contact_name');
      table.dropColumn('contact_phone');
      table.dropColumn('contact_email');
      table.dropColumn('in_out');
      table.dropColumn('facebook');
      table.dropColumn('street');
      table.dropColumn('city');
      table.dropColumn('zip');
      table.dropColumn('state');
    }),

    knex.schema.createTable('Band_Types', function(table) {
      table.increments('type_id').primary();
      table.string('type');
    }),

    knex.schema.dropTable('Band_Genres'),

    knex.schema.dropTable('Venue_Genres'),

    knex.schema.dropTable('Venue_Types'),

    knex.schema.dropTable('Venues_Types')

  ])
};
