'use strict';

/* Services */

angular.module('stackSearchServices', [])
    .value('baseUrl', 'http://api.stackexchange.com/2.2')
    .value('apiParams', {key: 'neqBjzyDBxrmDYRJoNwwYg((', site:'stackoverflow'})
    .factory('stackApi', function ($http, baseUrl, apiParams) {
        var o = {};
        o.searchByTitle = function (text) {
            var params = {intitle: text};
            angular.extend(params, apiParams);
            return $http.get(baseUrl + '/search', {params: params})
        };
        return o;
    });
