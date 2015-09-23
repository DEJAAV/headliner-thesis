var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var flash = require('connect-flash')

var passport = require('passport');
var session = require('express-session');
var morgan = require('morgan')
var cookieParser = require('cookie-parser');
var pg = require('pg');

var databasehost = process.env.HOST || 'localhost';
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: databasehost,
    database: 'headliner',
    charset: 'utf8'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

require('./passport')(passport, knex)

app.use(morgan('dev'));
app.use(cookieParser());

app.set('view engine', 'ejs')

app.use(session({
    secret: 'salty',
    saveUninitialized: true,
    save: true,
 resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('views'));

//require('./app/routes.js')(app, passport, knex);

app.listen(port);
console.log('Server running on port:', port)
