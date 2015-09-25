
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Band_Members', function(table) {
      table.integer('title_id').references('title_id').inTable('Musician_Titles');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Band_Members', function(table) {
      table.dropColumn('title_id');
    })
  ])
};
