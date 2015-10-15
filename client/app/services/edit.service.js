(function(){
  
  angular.module('headliner.editService', [])
  .factory('Edit', Edit);
  function Edit ($http, $location, $window) {

  function updateUserPswd(user) {
    console.log('updateUserPswd POST: ', user);
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
      url: '/api/users/venues/update', 
      data: venue
    })
    .then(function(resp) {
      return resp.data;
    })
  };

  function updateArtistInfo(artist) {
    console.log('updateArtistInfo POST: ', artist);
    return $http({
      method: 'POST',
      url: '/api/users/artists/update', 
      data: artist
    })
    .then(function(resp) {
      return resp.data;
    })
  };  

    return {
      updateUserPswd: updateUserPswd,
      updateVenueInfo: updateVenueInfo,
      updateArtistInfo: updateArtistInfo,
    };
  }
})();