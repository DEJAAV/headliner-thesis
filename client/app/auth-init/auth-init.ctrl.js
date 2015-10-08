(function(){
  angular.module('headliner.jwt', [])

  .controller('JwtController', JwtController);

  function JwtController ($scope, $rootScope, $window, $location, Auth) {
    $scope.who = function() {
      Auth.who().then(function(data) {
        if (data.category === 'venue') {
          $rootScope.currentUser = data;
          $location.path('/homepage-venue');
        } else if (data.category === 'artist') {
          $rootScope.currentUser = data;
          $location.path('/homepage-artist');
        } else {
          $location.path('/select');
        }
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('type', data.type);
        $window.localStorage.setItem('id', data.id);
      })
    };

    $scope.who();
  }
})();