require([
    'angular', 
    'item/item.module'
],
function(angular){
    angular.module('app.item')
       .service('ItemModel', function($http, $q, API){

        function _extract(result){
            return result.data;
        }

        function _getItemById(itemId){
            var deferred = $q.defer();
            $http.get( API.URL, {
                    params:{
                        api   : 'item',
                        id: itemId
                    }
                })
                .then(function(result){
                    deferred.resolve(_extract(result));
                });
            return deferred.promise;
        }

        function _getItemsByCategory(category, limit){
            var deferred = $q.defer();
            $http.get( API.URL, {
                    params:{
                        category: category,
                        limit: limit,
                        api: 'bookmarks'
                    }
                })
                .then(function(result){
                    deferred.resolve(_extract(result));
                });

            return deferred.promise;

        };

        return {
            getItemById: function(id) {
                return _getItemById(id);
            },
            getItemsByCategory: function(category, limit){
                return _getItemsByCategory(category, limit);
            }
        }
    });
});