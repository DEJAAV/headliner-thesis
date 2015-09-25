// 'headliner.service'


(function(){

  angular.module('headliner.authService', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {
    // signup requires server send over a token attach to data and pass it over to controller
    function signupVenue(user) {
      console.log('this is the user being sent in POST req: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/venues', 
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };

    function signupArtist(user) {
      console.log('this is the user being sent in POST req: ', user);
      return $http({
        method: 'POST',
        url: '/api/users/artists', 
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };    

    function login (user) {
      return $http({
        method: 'POST',
        url: '/api/users/login', /* get route */
        data: user
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    // check if a user is authorized when user switch pages on app
    function isAuth () {
      return !!$window.localStorage.getItem('headliner');
    };

    // signout user by removing token that is stored in the client's localStorage
    function signout () {
      $window.localStorage.removeItem('headliner');
      $location.path('/');
    };

    return {
      signupVenue: signupVenue,
      signupArtist: signupArtist,
      login: login,
      isAuth: isAuth,
      signout: signout
    };
  };

})();