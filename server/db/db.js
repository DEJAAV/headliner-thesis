var Auth = process.env.PORT ? require('../auth.js') : require('../localauth.js');

var knex = require('knex')(Auth.pgData);

module.exports = knex;