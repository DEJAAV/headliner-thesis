(function(){
  angular.module('headliner.jwt', [])

  .controller('JwtController', JwtController);

  function JwtController ($scope, $window, $location, Auth) {
    $scope.who = function() {
      Auth.who().then(function(res) {
        if (res.data.type === 'venue') {
          $location.path('/homepage-venue');
        } else if (res.data.type === 'artist') {
          $location.path('/homepage-artist');
        } else {
          $location.path('/select');
        }
        $window.localStorage.setItem('headliner', res.data.token);
        $window.localStorage.setItem('type', res.data.type);
      })
    };

    $scope.who();
  }
})();