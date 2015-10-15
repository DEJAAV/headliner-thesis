(function() {
  angular.module('headliner.editArtist', [])

  .controller('EditArtistController', EditArtistController);

  function EditArtistController($scope, $window, $location, $rootScope, Edit, Global, Auth, Profile) { // Edit is the injected service     
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed || localStorage.getItem('type') === 'venue') {
        $location.path('/#/');
      }
    }, true);

    $scope.song = {};

    $scope.allGenres = Global.allGenres;
    $scope.states = Global.states;

    Auth.getUserById().then(function(user) {
      $scope.user = user[0];
      Profile.getAllArtists().then(function(artists) {
        for (var i = 0; i < artists.length; i++) {
          if (artists[i].artist_id === user[0].artist_id) {
            $scope.artist = artists[i];
          }
        }
      });
    });
    
    $scope.updateArtistInfo = function(artist) {
      Edit.updateArtistInfo(artist);
      window.location.reload();
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
      window.location.reload();
    };  
    
    $scope.remove = function(member){
      delete $scope.artist.members[member];
    };

    $scope.addNewMember = function(name, role){
      $scope.artist.members = $scope.artist.members || {};
      $scope.artist.members[name] = role;
      $scope.name = "";
      $scope.role = "";
    };

  }
})();
