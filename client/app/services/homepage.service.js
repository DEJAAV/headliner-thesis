(function() {

  angular.module('headliner.service')
    .factory('Homepage', Homepage)

  function Homepage($http, $location, $window) {
    //get all artists to load on to the venues homepage display
    function getAllArtists() {
      return $http({
          method: 'GET',
          url: '/* get route */'
        })
        .then(function(resp) {
          return resp.data;
        })
    }

  //get all venues to load on to the artists homepage display
  function getAllVenues() {
    return $http({
        method: 'GET',
        url:'/* get route */'
      })
      .then(function(resp) {
        return resp.data;
      })
  }

  return {
    getAllArtists: getAllArtists,
    getAllVenues: getAllVenues
  }
}

})();