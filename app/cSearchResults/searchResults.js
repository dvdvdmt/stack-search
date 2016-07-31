'use strict';

angular.module('cSearchResults', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search/:searchText', {
            templateUrl: 'cSearchResults/searchResults.html',
            controller: 'SearchResultsCtrl'
        });
    }])
    .controller('SearchResultsCtrl', function ($scope, $routeParams, $sce, stackApi) {
        $scope.questions = [];
        $scope.onClickTag = function (tag) {
            // stackApi
        };

        stackApi.questionsByTitle($routeParams.searchText).then(function (res) {
            res.data.items.forEach(function (question) {
                $scope.questions.push({
                    id: question.question_id,
                    author: question.owner.display_name,
                    title: $sce.trustAsHtml(question.title),
                    answer_count: question.answer_count,
                    tags: question.tags
                })
            })
        });
    });