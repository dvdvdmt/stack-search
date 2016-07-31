'use strict';

angular.module('cQuestionInfo', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/question/:id', {
            templateUrl: 'cQuestionInfo/questionInfo.html',
            controller: 'QuestionInfoCtrl'
        });
    }])

    .controller('QuestionInfoCtrl', function ($scope, $routeParams, $sce, stackApi) {
        stackApi.queryById($routeParams.id).then(function (res) {
            $scope.question = res.data.items[0];
            $scope.body = $sce.trustAsHtml($scope.question.body);
        })

    });