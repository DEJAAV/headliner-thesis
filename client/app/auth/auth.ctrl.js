// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
    $scope.user = {};
    $scope.user.err = '';
    
    $scope.signupVenue = function () {
      $scope.user.venue = true; 
      Auth.signupVenue($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('headliner', token);
          console.log($scope.user, '$scope user before redirect')
          $location.path('/find-bands'); 
        })
        .catch(function(error){
          console.log("this is the caught error on signup AuthCtrl", error)
          if ( error.data.indexOf('taken') > -1 ) {
            $scope.user.err = 'Error in form' //err will change once checks in place in ang
          } else {
            $scope.user.err = 'Error';
          }
        });
    };

    $scope.signupArtist = function () {
      $scope.user.artist = true;
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('headliner', token);
          console.log($scope.user, '$scope user before redirect')
          $location.path('/find-venues'); 
        })
        .catch(function(error){
          if ( error.data.indexOf('taken') > -1 ) {
            $scope.user.err = 'Error in form' 
          } else {
            $scope.user.err = 'Error';
          }
        });
    };    

    // $scope.signupVenue = function () {
    //   Auth.signupVenue($scope.user)
    //     .then(function (token) {
    //       // set user's localstorage token to allow user to be authorized to browser other web pages
    //       // also direct user to create their first project
    //       $window.localStorage.setItem('headliner', token);
    //       $location.path('/homepage'); 
    //     })
    //     .catch(function(error){
    //       console.log("error", error)
    //       // check error to display different Error to user
    //       if ( error.data.indexOf('taken') > -1 ) {
    //         $scope.user.err = 'Error: Username is taken'
    //       } else {
    //         $scope.user.err = 'Error: Invalid password';
    //       }
    //     });
    // };    

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('headliner', token);
        $location.path('/find-bands'); 
      })
      .catch(function (error) {
        if (error.data.error.indexOf('No') > -1) {
          $scope.user.err = 'Error: Invalid password'
        } else {
          $scope.user.err = 'Error: ' + error.data.error;
        }
      });
  };
}
})();