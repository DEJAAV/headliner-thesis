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
          $location.path('/homepage-venue'); 
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
      Auth.signupArtist($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('headliner', token);
          console.log($scope.user, '$scope user before redirect')
          $location.path('/homepage-artist'); 
        })
        .catch(function(error){
          if ( error.data.indexOf('taken') > -1 ) {
            $scope.user.err = 'Error in form' 
          } else {
            $scope.user.err = 'Error';
          }
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