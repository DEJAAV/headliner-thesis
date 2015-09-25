
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.integer('type_id').references('type_id').inTable('Band_Types');
      table.string('e-mail');
      table.integer('phone_number');
      table.string('record_label');
      table.string('facebook');
      table.string('youtube');
      table.string('soundcloud');
      table.string('bandcamp');
      table.string('website');
      table.string('bio');
    }),

    knex.schema.createTable('Band_Types', function(table) {
      table.increments('type_id').primary();
      table.string('type');
    }),

    knex.schema.table('Venues', function(table) {
      table.string('bio');
      table.string('website');
      table.string('yelp');
      table.string('address');
    }),

    knex.schema.createTable('Musician_Titles', function(table) {
      table.increments('title_id').primary();
      table.string('title');
    }),

    knex.schema.createTable('Band_Members', function(table) {
      table.increments('member_id').primary();
      table.integer('band_id').references('band_id').inTable('Bands');
      table.string('member_name');
    })


  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.dropColumn('type_id');
      table.dropColumn('e-mail');
      table.dropColumn('phone_number');
      table.dropColumn('record_label');
      table.dropColumn('facebook');
      table.dropColumn('youtube');
      table.dropColumn('soundcloud');
      table.dropColumn('bandcamp');
      table.dropColumn('website');
      table.dropColumn('bio');
    }),

    knex.schema.dropTable('Band_Types'),

    knex.schema.table('Venues', function(table) {
      table.dropColumn('bio');
      table.dropColumn('website');
      table.dropColumn('yelp');
      table.dropColumn('address');
    }),

    knex.schema.dropTable('Musician_Titles'),

    knex.schema.dropTable('Band_Members')

  ])
};
