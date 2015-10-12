(function(){
  
  angular.module('headliner.requestsService', [])
  .factory('Requests', Requests);

  function Requests ($http, $location, $window) {

    function getRequests () {
      return $http({
        method: 'GET',
        url: '/api/requests',
      })
      .then(function(resp){
        return resp.data;
      });
    };

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

    function deleteRequest(request) {
      return $http({
        method: 'POST',
        url: '/api/accept',
        data: request
      });
    };

    function addShow(request) {
      return $http({
        method: 'POST',
        url: '/api/shows',
        data: request
      });
    };

    return {
      getRequests: getRequests,
      deleteRequest: deleteRequest,
      addShow: addShow,
      getAllArtists: getAllArtists,
      getAllVenues: getAllVenues
    };
  
  };

})();