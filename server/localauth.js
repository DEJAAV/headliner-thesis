module.exports = {
'secret': 'Not Keyboard Cat',

'facebookAuth': {
 'clientID': '413312322195517',  
 'clientSecret': '923961a9ca55e1172c3b9955bb7cde9c',
 'callbackURL': '/auth/facebook/callback'
},
'pgData': {
  client: 'pg',
  connection:  {
   host: 'localhost',
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
 'callbackURL': '/auth/google/callback' 
 }
}