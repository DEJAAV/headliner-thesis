(function() {
  angular.module('headliner.edit', [])

  .controller('EditController', EditController);

  function EditController($scope, $window, $location, $rootScope, Profile) { // Edit is the injected service     

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { 
      return { abbrev: state }; 
      });

  $scope.artist = [{
    "name": "Ellie",
    "street": "123 Peanut Street",
    "city": "Austin",
    "state": "TX",
    "zip": "78751",
    "type": {
      "americana": true,
      "blues": true,
      "metal": false,
      "casual": true,
      "lounge": true,
      "jazz": true
    },
    "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
    "contact_phone": "8327944795",
    "facebook": "http://www.facebook.com/elliematsusaka",
    "yelp": "http://www.yelp.com",
    "website": "http://www.google.com"
  }]

  $scope.venue = [{
    "venue_name": "Ellie's Lounge",
    "street": "123 Peanut Street",
    "city": "Austin",
    "state": "TX",
    "zip": "78751",
    "type": {
      "americana": true,
      "blues": true,
      "metal": false,
      "casual": true,
      "lounge": true,
      "jazz": true
    },
    "inout": "Indoor/Outdoor",
    "capacity": 150,
    "about": "My venue is bitchin'",
    "contact_phone": "8327944795",
    "facebook": "http://www.facebook.com/elliematsusaka",
    "yelp": "http://www.yelp.com",
    "website": "http://www.google.com"
  }];   
  }
})();