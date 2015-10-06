(function(){
  
  angular.module('headliner.messagesService', [])
  .factory('Messages', Messages);

  function Messages ($http, $location, $window) {

    function getMessages () {

    };

    function getConversations () {

    };

    function sendMessage () {

    };

    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists,
      sendMessage: sendMessage
    }
  
  };

})();
