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
      })
    };

    return {
      getRequests: getRequests
    };
  
  };

})();