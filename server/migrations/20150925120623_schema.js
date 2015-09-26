
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
    knex.schema.table('Users', function(table) {
      table.string('username');
      table.dropColumn('email');
      table.dropColumn('facebook_email');
      table.dropColumn('facebook_id');
      table.dropColumn('facebook_token');
      table.dropColumn('facebook_name');
    })
  ])
};
