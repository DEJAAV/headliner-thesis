var Auth = (process.env.NODE_ENV === 'production') ? require('../auth.js') : require('../localauth.js');

var knex = require('knex')(Auth.pgData);

module.exports = knex;