// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
  $scope.venue = {};
  $scope.user = {}; // for bands
  $scope.user.member = {};
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { 
      return { abbrev: state }; 
      });
  $scope.signupGeneral = function () {
    Auth.signupGeneral($scope.user)
      .then(function (data) {
        console.log(data, 'data');
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('type', null);
        $location.path('/select'); 
      })
      .catch(function (error) {
          $scope.user.error = 'Username is already taken.'
          console.error(error);
      });
  };

    $scope.signupVenue = function () {
      Auth.signupVenue($scope.venue)
        .then(function () {
          $window.localStorage.setItem('type', 'venue');
          $location.path('/homepage-venue');
        })
        .catch(function(error){
          console.log(error);
        });
    };

    $scope.signupArtist = function () {
      Auth.signupArtist($scope.user)
        .then(function () {
          $window.localStorage.setItem('type', 'artist');
          $location.path('/homepage-artist');
        })
        .catch(function(error){
          console.log(error);
        });
    };    

  
    //Sets a band member's name as a property in the
    //member object, their role as the value
    $scope.addNewMember = function(name, role){
        $scope.user.member[name] = role;
        //console.log("Name: ", name);
        $scope.name = "";
        $scope.role = "";
     };



  $scope.login = function () {
  Auth.login($scope.user)
    .then(function (data) {
      if(data.error) {
        $scope.login.error = data.error;
      } else {
        if (data.type === 'venue') {
          $location.path('/homepage-venue');
        } else if (data.type === 'artist') {
          $location.path('/homepage-artist');
        } else {
          $location.path('/select');
        }
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('type', data.type);
      }
    })
    .catch(function (error) {
      console.log('error with login: ', error)
    });
  };

  $scope.signout = function() {
    Auth.signout();
    console.log('user signed out');
  }

}
})();