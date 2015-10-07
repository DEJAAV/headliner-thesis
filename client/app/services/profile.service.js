(function(){

  angular.module('headliner.profileService', [])

  .factory('Profile', Profile)

  function Profile ($http, $location, $window) {

    var id = $location.$$path.slice(($location.$$path).length-1)

    function getAllVenues () {
      console.log('getAllVenues is being called1');
      return $http({
        method: 'GET',
        url: '/api/venues'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function getAllArtists () {
      return $http({
        method: 'GET',
        url: '/api/artists'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function sendRequest (request) {
      return $http({
        method: 'POST',
        url: '/api/request',
        data: request
      })
    };

    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists,
      sendRequest: sendRequest,
      id: id
    };
  }
})();
