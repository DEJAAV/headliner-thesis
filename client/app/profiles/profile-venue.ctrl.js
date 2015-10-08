(function() {
  angular.module('headliner.venueProfile', []).controller('VenueProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope,
    Profile) { // Profile is the injected service 


    $scope.request = {};
    $scope.request.message = "We want to play!";


    $scope.getVenueById = function(id){
      Profile.getAllVenues().then(function(venues) {
        for (var venue in venues) {
          if (venues[venue].venue_id.toString() === Profile.id) {
            $scope.venue = venues[venue]
          }
        }
      })
    };

    $scope.getVenueById(Profile.id);

    $scope.sendRequest = function() {
      $scope.request.venue_id = Profile.id;
      $scope.request.receiver = 'venue';
      $scope.request.sender = 'band';
      Profile.sendRequest($scope.request);
    };

    $scope.init = function() {
      $(document).ready(function(){
        $('ul.tabs').tabs();
      });
    }; 

    $scope.minDate = new Date();
    $scope.opened = false;

    $scope.open = function() {
      $scope.opened = true;
    };

    $scope.disabled = function(date) {
      if ($scope.venue.shows) {
        return $scope.venue.shows.map(function(show) {return show.date;}).indexOf(date.toISOString().split('T')[0]) > -1;
      }
    };
  };
})();