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

    function acceptRequest(request) {
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
      acceptRequest: acceptRequest,
      addShow: addShow
    };
  
  };

})();