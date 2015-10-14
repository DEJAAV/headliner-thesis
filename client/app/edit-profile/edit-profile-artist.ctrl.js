(function() {
  angular.module('headliner.editArtist', [])

  .controller('EditArtistController', EditArtistController);

  function EditArtistController($scope, $window, $location, $rootScope, Edit, Global, Auth, Profile) { // Edit is the injected service     
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

    $scope.song = {};

    $scope.allGenres = Global.allGenres;
    $scope.states = Global.states;

    Auth.getUserById().then(function(user) {
      $scope.currentUser = user[0];
      Profile.getAllArtists().then(function(artists) {
        for (var i = 0; i < artists.length; i++) {
          if (artists[i].artist_id === user[0].artist_id) {
            $scope.user = artists[i];
          }
        }
      });
    });
    
    $scope.updateArtistInfo = function(artist) {
      Edit.updateArtistInfo(artist);
      console.log('successfully updated artist info');
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
      console.log('successfully updated user password');
    };  
    $scope.remove = function(index){
      $scope[yourArray].splice(index, 1) //fix this, the member property is an object, not an array..
    };

  }
})();