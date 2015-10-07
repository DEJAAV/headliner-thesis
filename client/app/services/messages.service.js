(function(){
  
  angular.module('headliner.messagesService', [])
  .factory('Messages', Messages);

  function Messages ($http, $location, $window) {

    function getMessages () {
      return $http({
        method: 'GET',
        url: '/api/messages',
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function getConversations () {
      return $http({
        method: 'GET',
        url: '/api/conversations',
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function sendMessage () {
      return $http({
        method: 'POST',
        url: '/api/message', 
        data: message
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    return {
      getMessages: getMessages,
      getConversations: getConversations,
      sendMessage: sendMessage
    };
  
  };

})();
