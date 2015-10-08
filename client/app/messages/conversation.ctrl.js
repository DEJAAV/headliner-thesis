(function() {
  angular.module('headliner.conversation', []).controller('ConversationController', ConversationController);

  function ConversationController($scope, $window, $location, $rootScope, Messages) {
    var name = $location.$$path.slice(14);
    Messages.getConversation().then(function(messages) {
      $scope.messages = messages.filter(function(message) {
        return message.sender === name || message.reciever === name;
      });
    });
  }
})();
