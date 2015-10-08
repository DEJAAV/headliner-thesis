(function() {
  angular.module('headliner.requests', []).controller('RequestsController', RequestsController);

  function RequestsController($scope, $window, $location, $rootScope, Requests) {
    Requests.getRequests().then(function(requests){
      $scope.requests = requests
    })
  }
})();