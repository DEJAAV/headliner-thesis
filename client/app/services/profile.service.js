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

  function updateVenuePswd(user) {
    console.log('updateVenuePswd POST: ', user);
    return $http({
      method: 'POST',
      url: '/api/users/local', 
      data: user
    })
    .then(function(resp) {
      return resp.data;
    })
  };

  function updateVenueInfo(venue) {
    console.log('updateVenueInfo POST: ', venue);
    return $http({
      method: 'POST',
      url: '/api/users/venues', 
      data: venue
    })
    .then(function(resp) {
      return resp.data;
    })
  };

    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists,
      sendRequest: sendRequest,
      updateVenuePswd: updateVenuePswd,
      updateVenueInfo: updateVenueInfo
    };
  }
})();
