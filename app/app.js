'use strict';

// Declare app level module which depends on views, and components
angular.module('stackSearch', [
    'ngRoute',
    'cSearchResults',
    'cQuestionInfo',
    'stackSearchServices'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]).controller('MainCtrl', function ($scope, $location) {
    $scope.onSearch = function () {
        $location.path('/search/' + $scope.searchText)
    };
    $scope.searchText = '';
});
