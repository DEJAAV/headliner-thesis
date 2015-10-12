(function(){

  angular.module('headliner.profileService', [])

  .factory('Profile', Profile)

  function Profile ($http, $location, $window) {

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

    function getShows () {
      return $http({
        method: 'GET',
        url: '/api/artist/shows'
      })
      .then(function(resp) {
        return resp.data
      })
    }

    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists,
      getAllSongs: getAllSongs,
      getMyProfile: getMyProfile,
      sendRequest: sendRequest,
      getShows: getShows
    };
  }
})();
