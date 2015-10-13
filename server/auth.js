var databasehost = process.env.HOST || 'localhost';

module.exports = {
 'secret': process.env.SECRET,
 
'facebookAuth': {
  'clientID': process.env.FACEBOOK_CLIENT_ID,
  'clientSecret': process.env.FACEBOOK_CLIENT_SECRET,
  'callbackURL': process.env.FACEBOOK_CALLBACK_URL 
},
'pgData': {
   client: 'postgresql',
   connection:  process.env.DATABASE_URL,
   migrations: {
     tableName: 'knex_migrations'
   }
 },
 'googleAuth': {
  'clientID': process.env.GOOGLE_CLIENT_ID,
  'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
  'callbackURL': process.env.GOOGLE_CALLBACK_URL 
  }
}

// if (process.env.NODE_ENV === 'production') {
//   exports.pgData.connection = process.env.DATABASE_URL
// }
