define([
    'angular',
    'item/item.model',
        'cart/cart.module',
],
function (angular) {
    angular.module('app.item', ['app.cart'])
        .config(function ($locationProvider, $stateProvider) {
            $stateProvider
                .state('root.home.item', {
                    url: 'item/:id',
                    data: {
                        authenticated: false
                    },
                    views: {
                        'content@': {
                            controller: 'ItemController as item',
                            templateUrl: 'app/item/views/_item.html'
                        }
                    }
                })
        })
        .controller('ItemController', function ItemController($scope, $stateParams, ItemModel) {
            var item = this;
            ItemModel.getItemById($stateParams.id)
                .then(function (result) {
                    item.data = result;
            });
        })
    ;
});