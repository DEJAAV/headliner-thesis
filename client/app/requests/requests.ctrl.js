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
    
    Requests.markAsRead();

    Requests.getRequests().then(function(requests){
      $scope.requests = requests;
      $scope.requests.forEach(function(request) {
        request.date = new Date(request.date).toLocaleString().split(',')[0]
      });
    });

    Requests.getAllArtists().then(function(artists) {
      for (var artist in artists) {
        for (var request in $scope.requests) {
          if ($scope.requests[request].artist_id === artists[artist].artist_id) {
            $scope.requests[request].artist_name = artists[artist].artist_name
          }
        }
      }
    })

    Requests.getAllVenues().then(function(venues) {
      for (var venue in venues) {
        for (var request in $scope.requests) {
          if ($scope.requests[request].venue_id === venues[venue].venue_id) {
            $scope.requests[request].venue_name = venues[venue].venue_name
          }
        }
      }

    })


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