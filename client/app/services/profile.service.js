(function(){

  angular.module('headliner.profileService', [])

  .factory('Profile', Profile)

  function Profile ($http, $location, $window) {

    function getAllVenues () {
      console.log('getAllVenues is being called');
      return $http({
        method: 'GET',
        url: '/api/venues'
      })
      .then(function(resp){
        console.log('GET:',resp.data);
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
    };
  }
})();
