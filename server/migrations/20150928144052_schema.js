
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Users', function(table) {
      table.integer('google_id');
      table.string('google_email');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Users', function(table) {
      table.dropColumn('google_id');
      table.dropColumn('google_email');
    })
  ])
};
