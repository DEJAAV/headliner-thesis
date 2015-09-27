
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.dropColumn('e-mail');
      table.string('email');;
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('Bands', function(table) {
      table.string('e-mail');
      table.dropColumn('email');;
    })
  ]);
};
