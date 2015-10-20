var Requests = require('./server/models/requests.js');
var Shows = require('./server/models/shows.js');

function findExpired() {

  var today = new Date().toLocaleString().split(',')[0];

  Requests.deleteExpiredRequests(today);

}

setInterval(function() {
  findExpired(), 1000
}

