define([
    'angular',
],
function(angular, app){
    angular.module('app.cart',[])
    //todo global templates path for module
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
                return _.find(this.$cart.items, {'id': id});
                //console.log(item);
            }

            this.addItem = function(item){
                //$rootScope.$broadcast('cart:itemAdded', item.id);
                this.$cart.items.push(item);
                console.log(this.$cart.items);
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
        //todo move to global item mod
        .component('itemOptions', {
            templateUrl: 'app/cart/views/comp-item-options.html',
            controller: 'ItemOptionsController',
            bindings: {
                item: '<'
            }
        })
        .controller('ItemOptionsController', function(){

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
                if(cartService.getItemById(item.id)){
                    return true;
                }
                return false;
            }

            this.removeItem = function(item){
                cartService.removeItem(item);
            }

        }])
})