
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Users', function(table) {
      table.dropColumn('username');
      table.string('email');
      table.string('facebook_email');
      table.string('facebook_id');
      table.string('facebook_token');
      table.string('facebook_name');
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
