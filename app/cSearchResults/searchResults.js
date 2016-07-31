'use strict';

angular.module('cSearchResults', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search/:searchText', {
            templateUrl: 'cSearchResults/searchResults.html',
            controller: 'SearchResultsCtrl'
        });
    }])
    .directive('moreInfo', function ($document, $window) {
        return {
            restrict: 'E',
            templateUrl: 'cSearchResults/moreInfo.html',
            scope: {
                questions: '=',
                opened: '='
            },
            link: function (scope, elem, attrs) {
                elem.parent().css({height: $window.innerHeight - 50 + 'px'});
                var bodyEl = angular.element('body');
                var showHideEl = angular.element('.btn-show-hide');
                var moreResultsEl = elem.find('.more-results');


                elem.on('mouseenter', function () {
                    bodyEl.addClass('no-scroll');
                });
                elem.on('mouseleave', function () {
                    bodyEl.removeClass('no-scroll');
                });

                scope.$watch('opened', function (opened) {
                    if (opened) {
                        moreResultsEl.show();
                        showHideEl.addClass('opened');
                        showHideEl.removeClass('closed');
                    } else {
                        moreResultsEl.hide();
                        showHideEl.addClass('closed');
                        showHideEl.removeClass('opened');
                    }
                })
            }
        }
    })
    .controller('SearchResultsCtrl', function ($scope, $routeParams, $sce, stackApi) {
        $scope.rightPanelOpen = false;
        $scope.questions = [];
        $scope.moreInfo = [];
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
                });
            });
            $scope.moreInfo = $scope.questions
        });
    });