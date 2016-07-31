'use strict';

angular.module('cQuestionInfo', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/question/:id', {
            templateUrl: 'cQuestionInfo/questionInfo.html',
            controller: 'QuestionInfoCtrl'
        });
    }])

    .controller('QuestionInfoCtrl', function ($scope, $routeParams, $sce, stackApi) {
        $scope.answers = [];

        stackApi.questionById($routeParams.id)
            .then(function (res) {
                $scope.question = res.data.items[0];
                $scope.question.title = $sce.trustAsHtml($scope.question.title);
                $scope.body = $sce.trustAsHtml($scope.question.body);
                return $scope.question
            }).then(function (question) {
            if (question.is_answered) {
                stackApi.answersByQuestionId(question.question_id)
                    .then(function (res) {
                        res.data.items.forEach(function (answer) {
                            $scope.answers.push({
                                body: $sce.trustAsHtml(answer.body),
                                author: answer.owner.display_name,
                                creation_date: answer.creation_date * 1000,
                                score: answer.score
                            })
                        })

                    })
            }
        });

    });