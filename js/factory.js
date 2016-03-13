'use strict';

angular.module('authFact', ['LocalStorageModule'])
  .factory('authInterceptor', function ($rootScope, $q, $window, localStorageService) {
    
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (localStorageService.get('key')) {
          config.headers.Authorization = 'Bearer ' + localStorageService.get('key');
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  });