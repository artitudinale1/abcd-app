'use strict';


// Declare app level module which depends on filters, and services
angular.module('JpcAbcApp', ['ngRoute', 'firebase', 'JpcAbcApp.filters', 'JpcAbcApp.services', 'JpcAbcApp.directives', 'JpcAbcApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'Cntl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'Cntl2'});
    $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'Cntl2'});
    $routeProvider.when('/view4', {templateUrl: 'partials/partial4.html', controller: 'Cntl3'});
    $routeProvider.when('/view5', {templateUrl: 'partials/partial5.html', controller: 'Cntl5'});
    $routeProvider.when('/view6', {templateUrl: 'partials/partial6.html', controller: 'Cntl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);



