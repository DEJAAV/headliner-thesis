(function() {
  angular.module('headliner.requests', []).controller('RequestsController', RequestsController);

  function RequestsController($scope, $window, $location, $rootScope, Requests) {

    Requests.getRequests().then(function(requests){
      $scope.requests = requests
      $scope.requests.forEach(function(request) {
        request.date = new Date(request.date).toLocaleString().split(',')[0]
      });
    });

    $scope.acceptRequest = function(req){
      Requests.acceptRequest(req);
      $window.location.reload();
    };

    $scope.addShow = function(req){
      Requests.addShow(req);
    }

  };
})();