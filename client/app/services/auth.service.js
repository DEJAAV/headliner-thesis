// 'headliner.service'


(function(){

  angular.module('headliner.authService', [])

  .factory('Auth', Auth)

  function Auth ($http, $location, $window) {
    // signup requires server send over a token attach to data and pass it over to controller
    function signup(user) {
      return $http({
        method: 'POST',
        url: 'api/signup', /* get route */
        data: user
      })
      .then(function(resp) {
        return resp.data.token;
      });
    };
    // function signupVenue (user) {
    //   return $http({
    //     method: 'POST',
    //     url: '/users/signup/venue',  get route 
    //     data: user
    //   })
    //   .then(function(resp) {
    //     return resp.data.token;
    //   });
    // };

    // login require server send over data with token and hasWIP and hand them over to controller
    function login (user) {
      return $http({
        method: 'POST',
        url: '/users/login', /* get route */
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
      $location.path('/landing');
    };

    return {
      signup: signup,
      // signupVenue: signupVenue,
      login: login,
      isAuth: isAuth,
      signout: signout
    };
  };

})();