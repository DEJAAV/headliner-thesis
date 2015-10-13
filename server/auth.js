var databasehost = process.env.HOST || 'localhost';

module.exports = {
 'secret': 'Not Keyboard Cat',
 
'facebookAuth': {
  'clientID': '413312322195517',
  'clientSecret': '923961a9ca55e1172c3b9955bb7cde9c',
  'callbackURL': 'http://localhost:3000/auth/facebook/callback' 
},
'pgData': {
   client: 'pg',
   connection: {
     host: databasehost,
     database: 'headliner',
     charset: 'utf8'
   },
   migrations: {
     tableName: 'knex_migrations'
   }
 },
 'googleAuth': {
   'clientID': '1048726055905-t7tngt9q3vp3firc3ncn8kmo89iipiip.apps.googleusercontent.com',
   'clientSecret': 'G9pbDg_QzHHlD9OTc0OFH4jp',
   'callbackURL': 'http://localhost:3000/auth/google/callback'
 }
}


// for HEROKU: When this is active we can remove auth.js from the .gitignore
// var databasehost = process.env.HOST || 'localhost';

// module.exports = {
//  'secret': process.env.SECRET,
 
// 'facebookAuth': {
//   'clientID': process.env.FACEBOOK_CLIENT_ID,
//   'clientSecret': process.env.FACEBOOK_CLIENT_SECRET,
//   'callbackURL': process.env.FACEBOOK_CALLBACK_URL 
// },
// 'pgData': {
//    client: 'pg',
//    connection: {
//      host: databasehost,
//      database: process.env.DATABASE_URL,
//      charset: 'utf8'
//    },
//    migrations: {
//      tableName: 'knex_migrations'
//    }
//  },
//  'googleAuth': {
//   'clientID': process.env.GOOGLE_CLIENT_ID,
//   'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
//   'callbackURL': process.env.GOOGLE_CALLBACK_URL 
//   }
// }