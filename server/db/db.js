var Auth = require('../auth.js');

var knex = require('knex')(Auth.pgData);

module.exports = knex;