(function(){

  angular.module('headliner.profileService', [])

  .factory('Profile', Profile)

  function Profile ($http, $location, $window) {

    var id = $location.$$path.slice(($location.$$path).lastIndexOf('/')+1)

    function getAllVenues () {
      return $http({
        method: 'GET',
        url: '/api/venues'
      })
      .then(function(resp) {
        return resp.data;
      })
    };

    function getAllArtists () {
      return $http({
        method: 'GET',
        url: '/api/artists'
      })
      .then(function(resp) {
        return resp.data;
      })
    };

    function getAllSongs () {
      return $http({
        method: 'GET',
        url: 'api/songs'
      }).then(function(resp) {
        return resp.data
      }).catch(function(err) {
        console.log(err);
        return err;
      })
    };

    function getMyProfile () {
      return $http({
        method: 'GET',
        url: 'api/users/profile'
      }).then(function(resp) {
        return resp.data
      }).catch(function(err) {
        console.log(err);
        return err;
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
