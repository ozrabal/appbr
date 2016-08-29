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
                            templateUrl: 'app/cart/views/_cart.html'
                        }
                    }
                })
        })
        .controller('CartDetailsController',['$scope', 'cartService', function($scope, cartService){
            //todo avoid duplicated!!
            $scope.cart = cartService;

        }])


        .controller('CartController',['$scope', 'cartService', function($scope, cartService){
/*
            $scope.$on('cart:itemAdded', function(ev, args){
                console.log('eventX found on Controller1 $scope');
            });
*/
            //todo save cart in session/local storage
            $scope.cart = cartService;

            $scope.itemInCart = function() {
                if (_.find(cartService.$cart.items, {'id': $scope.item.id})) {
                    return true;
                }
                return false;
            }




        }])
        .run(['cartService', function(cartService){
            cartService.init();
        }])
        .service('cartService',['$rootScope', function($rootScope){
            this.init = function(){
                this.$cart = {
                    items : []
                };
                //console.log(this);
            };


            this.getItemById = function(id){
                
            }

            this.addItem = function(item){
                //$rootScope.$broadcast('cart:itemAdded', item.id);
                this.$cart.items.push(item);
            }

            this.removeItem = function(item){
                _.remove(this.$cart.items, function(cartItem){
                    return cartItem.id === item.id;
                })
            }


            this.getItems = function(){
                //console.log('get');
                return this.$cart.items;
            }



        }])
        .directive('addToCart',['cartService', function(cartService){
            //console.log('cart');
            return {
                restrict: 'E',
                templateUrl:'app/cart/views/addtocart.html',
                controller : 'CartController',
                scope: {
                    item: '='
                },
                transclude: true,

                /*link: function(scope, element, attributes){
                    scope.$watch('item', function(item) {
                    element.bind('click', function(cartService){
                        console.log(scope.item);
                        cartService.addItem();
                    });

                    })
                }*/
            }
        }])
        .directive('cart',['cartService', function(cartService){
            return {
                scope: {},
                restrict: 'E',
                controller : 'CartController',
                transclude: true,
                templateUrl: 'app/cart/views/cart.html'
            }
        }])


})
