(function() {
  angular.module('headliner.edit', [])

  .controller('EditController', EditController);

  function EditController($scope, $window, $location, $rootScope, Profile) { // Edit is the injected service     

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function (state) { 
        return { abbrev: state }; 
        });

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
      Profile.updateVenueInfo(venue);
      console.log('successfully updated venue info');
    };

    $scope.updateVenuePswd = function(user) {
      Profile.updateVenuePswd(user);
      console.log('successfully updated user password');
    };  

  }
})();