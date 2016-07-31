'use strict';

// Declare app level module which depends on views, and components
angular.module('stackSearch', [
    'ngRoute',
    'cSearchResults',
    'cQuestionInfo',
    'stackSearchServices'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            template: '<div class="jumbotron">\n    <h1>Welcome to Stack Search</h1>\n    <p>Input some text in search form and hit Enter or click <i class="glyphicon glyphicon-search"></i></p>\n    <p><label class="btn btn-primary btn-lg" for=\'search-input\'>Lets start!</label></p>\n</div>'
        })
        .otherwise({redirectTo: '/'});
}]).controller('MainCtrl', function ($scope, $location) {
    $scope.onSearch = function () {
        $location.path('/search/' + $scope.searchText)
    };
    $scope.searchText = '';
});
