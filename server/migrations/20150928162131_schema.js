
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Users', function(table) {
      table.string('google_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Users', function(table) {
      table.dropColumn('google_id');
    })
  ]);
};
