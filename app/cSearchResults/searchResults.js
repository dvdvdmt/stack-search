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
            templateUrl: 'cSearchResults/panelInfo.html',
            scope: {
                questions: '=',
                opened: '=',
                info: '='
            },
            link: function (scope, elem, attrs) {
                elem.parent().css({height: $window.innerHeight - 50 + 'px'});
                var bodyEl = angular.element('body');
                var showHideEl = angular.element('.btn-show-hide');

                elem.on('mouseenter', function () {
                    bodyEl.addClass('no-scroll');
                });
                elem.on('mouseleave', function () {
                    bodyEl.removeClass('no-scroll');
                });

                scope.$watch('opened', function (opened) {
                    if (opened) {
                        showHideEl.addClass('opened');
                        showHideEl.removeClass('closed');
                    } else {
                        showHideEl.addClass('closed');
                        showHideEl.removeClass('opened');
                    }
                })
            }
        }
    })
    .controller('SearchResultsCtrl', function ($scope, $routeParams, $sce, stackApi) {
        $scope.panelOpen = false;
        $scope.panelQuestions = [];
        $scope.questions = [];

        function getTableData(items) {
            var tableData = [];
            items.forEach(function (question) {
                tableData.push({
                    id: question.question_id,
                    author: question.owner.display_name,
                    title: $sce.trustAsHtml(question.title),
                    answer_count: question.answer_count,
                    tags: question.tags
                });
            });
            return tableData;
        }

        $scope.onTagClick = function (tag) {
            $scope.panelOpen = true;
            $scope.panelInfo = {type: 'tag', tag: tag};
            stackApi.questionsByTag(tag).then(function (res) {
                $scope.panelQuestions = getTableData(res.data.items);
            })
        };

        stackApi.questionsByTitle($routeParams.searchText).then(function (res) {
            $scope.questions = getTableData(res.data.items);
        });
    });