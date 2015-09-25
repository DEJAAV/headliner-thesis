(function() {

  angular.module('headliner.homeService', [])
    .factory('Homepage', Homepage)

  function Homepage($http, $location, $window) {
    //get all artists to load on to the venues homepage display
    function getAllArtists() {
      return $http({
          method: 'GET',
          url: 'api/users'
        })
        .then(function(resp) { //handle if it's a venue or artist 
          return resp.data;
        })
    }

  //get all venues to load on to the artists homepage display
  function getAllVenues() {
    return $http({
        method: 'GET',
        url:'api/users'
      })
      .then(function(resp) { //handle if it's a venue or artist 
        return resp.data;
      })
  }

  return {
    getAllArtists: getAllArtists,
    getAllVenues: getAllVenues
  }
}

})();