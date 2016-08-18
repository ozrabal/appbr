require([
    'angular',
    'category/category.model',
    'item/item.model'
], function (angular) {
    angular.module('app.category', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('root.home.category', {
                    url: 'categories/:category',
                    views: {
                        'content@': {
                            controller: 'ItemsController as items',
                            templateUrl: 'views/items.tmpl.html'
                        }
                    }
                });
            $urlRouterProvider.otherwise('/');
        })
        .controller('ItemsController', function ItemsController($rootScope, $scope, $state, $stateParams, ItemModel) {
            var items  = this;
            ItemModel.getItemsByCategory($stateParams.category, Math.floor(Math.random() * 10) + 1)
                .then(function (result) {
                    items.all = result;
                });
            $scope.it = $stateParams.category;
            $scope.current = $stateParams.category;
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        })
    ;
});