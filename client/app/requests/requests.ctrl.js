(function() {
  angular.module('headliner.requests', []).controller('RequestsController', RequestsController);

  function RequestsController($scope, $window, $location, $rootScope, Requests) {
    Requests.getRequests().then(function(requests){
      console.log('requests', requests)
      $scope.requests = requests
      $scope.requests.forEach(function(request) {
        request.date = new Date(request.date).toLocaleString().split(',')[0]
      });
    });
  };
})();