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

    function getConversation () {
      return $http({
        method: 'GET',
        url: '/api/conversations',
      })
      .then(function(resp){
        return resp.data;
      })
    };

    function sendMessage (message) {
      return $http({
        method: 'POST',
        url: '/api/message',
        data: message
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    function markAsRead (id) {
      return $http({
        method: 'POST',
        url: '/api/messages/read', 
        data: id
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    return {
      getMessages: getMessages,
      getConversation: getConversation,
      sendMessage: sendMessage,
      markAsRead: markAsRead
    };
  
  };

})();
