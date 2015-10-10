(function() {
  angular.module('headliner.venueProfile', []).controller('VenueProfileController',
    ProfileController);

  // Profile is the injected service 
  function ProfileController($scope, $window, $location, $rootScope, Profile, Messages, Auth) {
    $scope.request = {};
    $scope.request.message = "We want to play!";

    //redirect if the user isn't logged in
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

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
      $scope.request.sender = 'artist';
      $scope.request.date = new Date($scope.date).toLocaleString().split(',')[0]
      Profile.sendRequest($scope.request);
    };

    $scope.sendMessage = function() {
      $scope.message.date = new Date().toISOString();
      $scope.message.id = parseInt($location.$$path.slice($location.$$path.lastIndexOf('/')+1));
      Messages.sendMessage($scope.message);
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

    $scope.checkType = function() {
      return $window.localStorage.getItem('type') !== $location.$$path.slice($location.$$path.lastIndexOf('-')+1,$location.$$path.lastIndexOf('/'));
    };

  };
})();