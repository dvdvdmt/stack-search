'use strict';

angular.module('cSearchResults', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search/:searchText', {
            templateUrl: 'cSearchResults/searchResults.html',
            controller: 'SearchResultsCtrl'
        });
    }])
    .controller('SearchResultsCtrl', function ($scope, $routeParams, stackApi) {
        // $scope.
        $scope.onClickTag = function (tag) {
            // stackApi
        };

        stackApi.queryByTitle($routeParams.searchText).then(function (res) {
            $scope.questions = res.data.items;
        });
    });