(function(){
  
  angular.module('headliner.homepage.service', [])
  .factory('Homepage', Homepage);

  function Homepage ($http, $location, $window) {

    function getAllVenues () {
      return $http({
        method: 'GET',
        url: '/users/venues'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function getAllArtists () {
      return $http({
        method: 'GET',
        url: '/users/artists'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists
    }
  };

})();