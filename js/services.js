'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('JpcAbcApp.services', []).
  service('firebaseConnection', ["$rootScope", function($rootScope) {
             $rootScope.user = null;
             return {
              getUser: function(user) {
                if(user !=null){
                    $rootScope.user = user;
                }
            }
        }
       

}]);


