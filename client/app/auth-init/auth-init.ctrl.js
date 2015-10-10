(function(){
  angular.module('headliner.jwt', [])

  .controller('JwtController', JwtController);

  function JwtController ($scope, $rootScope, $window, $location, Auth) {
    $scope.who = function() {
      Auth.who().then(function(data) {
        if (data.category === 'venue') {
          $rootScope.currentUser = data;
          $location.path('/homepage-venue');
          $window.localStorage.setItem('id', data.venue_id);
        } else if (data.category === 'artist') {
          $rootScope.currentUser = data;
          $location.path('/homepage-artist');
          $window.localStorage.setItem('id', data.artist_id);
        } else {
          $location.path('/select');
        }
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('type', data.category);
      })
    };

    $scope.who();
  }
})();