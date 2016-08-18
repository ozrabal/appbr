require(['angular', 'category/category.module'], function(angular){
    angular.module('app.category')
        .factory('CategoryModel', function($http, $q, API){
            function _extract(result){
                return result.data;
            }
            function _getCategories(limit){
                var deferred = $q.defer();
                $http.get( API.URL, {
                    params:{
                        limit : limit,
                        api   : 'categories'
                    }
                })
                .then(function(result){
                    deferred.resolve(_extract(result));
                });
                return deferred.promise;
            }
            return {
                getAll: function(limit) {
                    return _getCategories(limit);
                }
            }
        });
});