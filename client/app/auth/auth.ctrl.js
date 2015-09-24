// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
    $scope.user = {};
    $scope.user.err = '';
    
    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (token) {
          // set user's localstorage token to allow user to be authorized to browser other web pages
          // also direct user to create their first project
          $window.localStorage.setItem('headliner', token);
          $location.path('/login'); // change this redirect later
        })
        .catch(function(error){
          console.log("error", error)
          // check error to display different Error to user
          if ( error.data.indexOf('taken') > -1 ) {
            $scope.user.err = 'Error: Username is taken'
          } else {
            $scope.user.err = 'Error: Invalid password';
          }
        });
    };

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('headliner', token);
        $location.path('/landing'); //change
      })
      .catch(function (error) {
        if (error.data.error.indexOf('No') > -1) {
          $scope.user.err = 'Error: Invalid password'
        } else {
          $scope.user.err = 'Error: ' + error.data.error;
        }
      });
  };

})();