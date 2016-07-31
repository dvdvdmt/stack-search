'use strict';

/* Services */

angular.module('stackSearchServices', [])
    .value('baseUrl', 'http://api.stackexchange.com/2.2')
    .value('apiParams', {key: 'neqBjzyDBxrmDYRJoNwwYg((', site:'stackoverflow'})
    .factory('stackApi', function ($http, baseUrl, apiParams) {
        var o = {};
        o.queryByTitle = function (text) {
            var params = {intitle: text};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/search', {params: params})
        };
        o.queryById = function (id) {
            var params = {filter: 'withbody'};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/questions/' + id, {params: params})
        };
        return o;
    });
