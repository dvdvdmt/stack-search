'use strict';

angular.module('cSearchResults', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search/:searchText', {
            templateUrl: 'cSearchResults/searchResults.html',
            controller: 'SearchResultsCtrl'
        });
    }])
    .controller('SearchResultsCtrl', function ($scope, $routeParams) {
        $scope.searchText = $routeParams.searchText;
    });