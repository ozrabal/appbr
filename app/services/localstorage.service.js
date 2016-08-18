require(['angular', 'app'], function(angular){
    angular.module('app')
        .factory('localStorage', localStorageServiceFactory);

        function localStorageServiceFactory($window){
            if($window.localStorage){
                return $window.localStorage;
            }
            throw new Error('Local storage support is needed');
        }
        localStorageServiceFactory.$inject = ['$window'];
});