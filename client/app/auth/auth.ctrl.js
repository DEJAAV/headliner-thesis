// 'headliner.auth'
//AuthController

(function(){

  angular.module('headliner.auth', [])

  .controller('AuthController', AuthController);

  function AuthController ($scope, $window, $location, Auth) {
    
    $scope.newUser = {};
    $scope.newUser.err = '';
    $scope.user = {};
    $scope.user.err = '';
    
  $scope.signupGeneral = function () {
    Auth.signupGeneral($scope.newUser)
      .then(function (data) {
        $window.localStorage.setItem('headliner', data.token);
        $window.localStorage.setItem('userid', data.userid);
        $location.path('/homepage-artist'); //change this
      })
      .catch(function (error) {
          console.error(error);
      });
  };

    $scope.signupVenue = function () {
      $scope.user.venue = true; 
      Auth.signupVenue($scope.user)
        .then(function () {
          console.log('successfully signed up venue')
        })
        .catch(function(error){
          console.log(error);
        });
    };

    $scope.signupArtist = function () {
      $scope.user.artist = true;
      Auth.signupArtist($scope.user)
        .then(function () {
          console.log('successfully signed up artist')
        })
        .catch(function(error){
          console.log(error);
        });
    };    

    //Members array of objects for artist members and their roles (id included)
    $scope.user.members = [{id: 'member1'}];

    //Adds an incremented new member object to the array 
    //if the button is clicked on the form
    $scope.addNewMember = function(){
    	var newMemberNum = $scope.user.members.length+1;
    	$scope.user.members.push({'id':'member'+newMemberNum});
    };

    $scope.removeMember = function(){
    	var last = $scope.user.members.length-1;
    	$scope.user.members.splice(last);
    };

    $scope.showAddMember = function(member){
    	return member.id === $scope.user.members[$scope.user.members.length-1].id;
    };


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