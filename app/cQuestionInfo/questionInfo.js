'use strict';

angular.module('cQuestionInfo', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/question/:id', {
            templateUrl: 'cQuestionInfo/questionInfo.html',
            controller: 'QuestionInfoCtrl'
        });
    }])

    .controller('QuestionInfoCtrl', [function () {

    }]);