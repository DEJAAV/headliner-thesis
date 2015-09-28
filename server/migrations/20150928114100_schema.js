
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Musician_Titles')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Musician_Titles', function(table) {
      table.increments('title_id').primary();
      table.string('title');
    })
  ]);
};
