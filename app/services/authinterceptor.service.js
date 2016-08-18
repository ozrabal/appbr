//TODO rewrite!!
require(['angular', 'app', 'services/localstorage.service', 'services/session.service'], function(angular) {
    angular.module('app')
        .factory('AuthInterceptor', function($q, $location, $injector, session){
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    var state = $injector.get('$state');

                    if (localStorage.getItem('session.accessToken') ) {
                        config.headers.Authorization = 'Bearer ' + localStorage.getItem('session.accessToken');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        session.destroy();
                        var stateService = $injector.get('$state');
                        stateService.go('root.login');
                    }
                }
            };
        });
});