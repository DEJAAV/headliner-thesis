(function() {
  angular.module('headliner.editVenue', [])

  .controller('EditVenueController', EditVenueController);

  function EditVenueController($scope, $window, $location, $rootScope, Edit, Global) { // Edit is the injected service     
    
    $scope.allGenres = Global.allGenres;
    $scope.allTypes = Global.allTypes;
    $scope.states = Global.states;

    $scope.user = {
      username: "ellie.matsusaka@gmail.com",
      password: '9854376054673657'
    }
    
    $scope.venue = {"venue_name":"Bob's Bar",
      "street":"4613 KINGLET ST",
      "city":"HOUSTON",
      "zip":"77035-5035",
      "state":"MO",
      "genre":{"americana":true,"metal":true,"bluegrass":true},
      "inout":"Outdoor",
      "capacity":100,
      "type":{"casual":true,"dive":true},
      "about":"John draw real poor on call my from. May she mrs furnished discourse extremely. Ask doubt noisy shade guest did built her him. Ignorant repeated hastened it do. Consider bachelor he yourself expenses no. Her itself active giving for expect vulgar months. Discovery commanded fat mrs remaining son she principle middleton neglected. Be miss he in post sons held.",
      "contact_name":"Ellie Matsusaka",
      "contact_phone":"8327944795",
      "facebook":"http://www.facebook.com/elliematsusaka",
      "yelp":"http://www.yelp.com/elliematsusaka",
      "website":"http://www.google.com/elliematsusaka"
    };

    $scope.updateVenueInfo = function(venue) {
      Edit.updateVenueInfo(venue);
    };

    $scope.updateUserPswd = function(user) {
      Edit.updateUserPswd(user);
    }; 
  }
})();