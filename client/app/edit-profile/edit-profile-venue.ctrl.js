(function() {
  angular.module('headliner.editVenue', [])

  .controller('EditVenueController', EditVenueController);

  function EditVenueController($scope, $window, $location, $rootScope, Edit, Global, Auth, Profile) { // Edit is the injected service     
    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed || localStorage.getItem('type') === 'artist') {
        $location.path('/#/');
      }
    }, true);

    $scope.allGenres = Global.allGenres;
    $scope.allTypes = Global.allTypes;
    $scope.states = Global.states;

    Auth.getUserById().then(function(user) {
      $scope.user = user[0];
      Profile.getAllVenues().then(function(venues) {
        for (var i = 0; i < venues.length; i++) {
          if (venues[i].venue_id === user[0].venue_id) {
            $scope.venue = venues[i];
          }
        }
      });
    });

    $scope.updateVenueInfo = function(venue) {
      Edit.updateVenueInfo(venue);
      window.location.reload();
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
      window.location.reload();
    }; 
  }
})();
