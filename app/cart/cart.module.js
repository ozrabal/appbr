define([
    'angular',
],
function(angular, app){
    angular.module('app.cart',[])
        .controller('CartController',['$scope', 'cartService', function($scope, cartService){
/*
            $scope.$on('cart:itemAdded', function(ev, args){
                console.log('eventX found on Controller1 $scope');
            });
*/

            $scope.cart = cartService;

            $scope.itemInCart = function(){

                console.log('incart' + $scope.item.id);
//mock
                return true;
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
                console.log(this);
            };


            this.getItemById = function(id){
                
            }




            this.addItem = function(item){
                console.log('add' + item);
                $rootScope.$broadcast('cart:itemAdded', item.id);

                this.$cart.items.push(item);
            }

            this.getItems = function(){
                console.log('get');
                return this.$cart.items.length;
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
//todo called twice??
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
