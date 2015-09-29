(function(){
  
  angular.module('headliner.homeService', [])
  .factory('Homepage', Homepage);

  function Homepage ($http, $location, $window) {

    function getAllVenues () {
      console.log('getAllVenues is being called');
      return $http({
        method: 'GET',
        url: '/api/venues'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function getAllArtists () {
      console.log('getAllArtists is being called');
      return $http({
        method: 'GET',
        url: '/api/artists'
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