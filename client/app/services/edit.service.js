(function(){

  angular.module('headliner.editService', [])

  .factory('Edit', Edit)

  function Edit ($http, $location, $window) {
  
    function updateUserPswd(user) {
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
      updateVenueInfo: updateVenueInfo,
      updateUserPswd: updateUserPswd
    }
  }

  })();