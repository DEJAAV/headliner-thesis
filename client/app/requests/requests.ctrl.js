(function() {
  angular.module('headliner.requests', []).controller('RequestsController', RequestsController);

  function RequestsController($scope, $window, $location, $rootScope, Requests, Auth) {
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

    $scope.type = $window.localStorage.getItem('type')

    Requests.getRequests().then(function(requests){
      $scope.requests = requests;
      $scope.requests.forEach(function(request) {
        request.date = new Date(request.date).toLocaleString().split(',')[0]
      });
    });

    $scope.acceptRequest = function(req) {
      Requests.deleteRequest(req);
      $window.location.reload();
    };

    $scope.deleteRequest = function(req) {
      Requests.deleteRequest(req);
      $window.location.reload();
    }

    $scope.addShow = function(req){
      Requests.addShow(req);
    }

  };
})();