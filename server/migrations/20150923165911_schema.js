
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Band_Members', function(table) {
      table.integer('title_id').references('title_id').inTable('Musician_Titles');
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
    knex.schema.dropTable('Venue_Reviews'),
    knex.schema.dropTable('Band_Types'),
    knex.schema.dropTable('Band_Members')
  ])
};
