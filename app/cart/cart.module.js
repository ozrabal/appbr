define([
    'angular',
],
function(angular, app){
    angular.module('app.cart',[])

        .config(function ($locationProvider, $stateProvider) {
            $stateProvider
                .state('root.home.cart', {
                    url: 'cart',
                    data: {
                        authenticated: true
                    },
                    views: {
                        'content@': {
                            controller: 'CartDetailsController as cartDetails',
                            templateUrl: 'app/cart/views/state-cart-details.html'
                        }
                    }
                })
        })
        .controller('CartDetailsController',['$scope', 'cartService', function($scope, cartService){
            //todo avoid duplicated carts!!
            $scope.cart = cartService;
            $scope.hidecart =  true;

        }])

        .run(['cartService', function(cartService){
            cartService.init();
        }])
        .service('cartService',function(){
            this.init = function(){
                this.$cart = {
                    items : []
                };
            };

            this.getItemById = function(id){
                
            }

            this.addItem = function(item){
                //$rootScope.$broadcast('cart:itemAdded', item.id);
                this.$cart.items.push(item);
                //todo real product options, price etc...
            }

            this.removeItem = function(item){
                _.remove(this.$cart.items, function(cartItem){
                    return cartItem.id === item.id;
                })
            }

            this.getItems = function(){
                return this.$cart.items;
            }

        })

        .component('addToCart', {
            templateUrl: 'app/cart/views/comp-add-to-cart.html',
            controller: 'CartComponentController',
            bindings: {
                item: '<'
            }
        })
        .component('miniCart', {
            templateUrl: 'app/cart/views/comp-mini-cart.html',
            controller: 'CartComponentController'
        })
        .controller('CartComponentController', ['cartService', function(cartService, $element, $attrs){

            this.addItem = function(item){
                cartService.addItem(item);
            }

            this.getItems = function(){
                return cartService.getItems();
            }

            this.itemInCart = function(item) {
                if (_.find(cartService.$cart.items, {'id': item.id})) {
                    return true;
                }
                return false;
            }

            this.removeItem = function(item){
                cartService.removeItem(item);
            }

        }])
})