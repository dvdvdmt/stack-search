'use strict';

/* Services */

angular.module('stackSearchServices', [])
    .value('baseUrl', 'http://api.stackexchange.com/2.2')
    .value('apiParams', {key: 'neqBjzyDBxrmDYRJoNwwYg((', site: 'stackoverflow'})
    .factory('stackApi', function ($http, baseUrl, apiParams) {
        var o = {};
        o.questionsByTitle = function (text) {
            var params = {intitle: text, sort: 'votes', order: 'desc'};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/search', {params: params})
        };
        o.questionById = function (id) {
            var params = {filter: 'withbody'};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/questions/' + id, {params: params})
        };
        o.answersByQuestionId = function (id) {
            var params = {filter: 'withbody', sort: 'votes', order: 'desc'};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/questions/' + id + '/answers', {params: params})
        };
        return o;
    });
