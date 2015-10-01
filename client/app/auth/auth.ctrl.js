// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
    
  $scope.newUser = {};
  $scope.user = {};
  $scope.band = {};
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { 
      return { abbrev: state }; 
      });
  $scope.signupGeneral = function () {
    Auth.signupGeneral($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('type', data.type);
        $location.path('/select'); 
      })
      .catch(function (error) {
          console.error(error);
      });
  };

    $scope.signupVenue = function () {
      Auth.signupVenue($scope.user)
        .then(function () {
          console.log('successfully signed up venue')
          $location.path('/homepage-venue');
        })
        .catch(function(error){
          console.log(error);
        });
    };

    $scope.signupArtist = function () {
      Auth.signupArtist($scope.user)
        .then(function () {
          console.log('successfully signed up artist')
          $location.path('/homepage-artist');
        })
        .catch(function(error){
          console.log(error);
        });
    };    

    //Members array of objects for artist members and their roles (id included)
    $scope.band.members = [{id: 'member1'}];
    //Adds an incremented new member object to the array 
    //if the button is clicked on the form
    $scope.addNewMember = function(){
    	var newMemberNum = $scope.band.members.length+1;
    	$scope.band.members.push({'id':'member'+newMemberNum});
    };

    $scope.removeMember = function(){
    	var last = $scope.band.members.length-1;
    	$scope.band.members.splice(last);
    };

    $scope.showAddMember = function(member){
    	return member.id === $scope.members[$scope.members.length-1].id;
    };

    $scope.showMemberLabel = function (member) {
     return member.id === $scope.band.members[0].id;
    }


	$scope.login = function () {
	Auth.login($scope.user)
	  .then(function (data) {
	    $window.localStorage.setItem('headliner', data.token);
      $window.localStorage.setItem('type', data.type);
	    $location.path('/find-bands'); 
	  })
	  .catch(function (error) {
      console.log('error with login: ', error)
	  });
	};
}
})();