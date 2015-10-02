// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
    
  $scope.user = {};
  $scope.user.member = [{'id': 'member1'}];
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
      Auth.signupVenue($scope.user)
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

  
    //Adds an incremented new member object to the array 
    //if the button is clicked on the form
    $scope.addNewMember = function(name, role){
      // console.log("$scope.user.member length before click: ",Object.keys($scope.user.member).length);
      var newMemberNo = $scope.user.member.length+1;
      $scope.user.member.push({'id':'member'+newMemberNo});
      // $scope.user.member[name] = role;
      // console.log("$scope.user.member length after click: ",Object.keys($scope.user.member).length);
    };

    $scope.removeMember = function(){
      delete $scope.member[name];
    };

    $scope.showAddChoice = function(member) {
      return member.id === $scope.user.member[$scope.user.member.length-1].id;
    };

    $scope.showMemberLabel = function (member) {
     return member.id === $scope.user.member[0].id;
    }


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