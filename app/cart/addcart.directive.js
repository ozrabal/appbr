define([
    'angular',
    'app',
    'cart/cart.module'
], function(angular, app){
    angular.module('app.cart')
        .directive('addToCart',[ function(){
        return{
            restrict: 'E',
            templateUrl:'app/cart/addtocart.html',
            //controller : 'CartController',
            scope: {
                item: '='
            },
            transclude: true,
            //replace: true,
           /* compile: function(element, attributes){
                return {
                    post:function(scope, element, attributes){
                        scope.itemInCart = function(){
                            console.log(scope.item.id)
                            return true;
                        }
                    }
                }
            },*/
            link: function(scope, element, attributes){
                //scope.$watch('item', function(item) {
                element.bind('click', function(){
                        console.log(scope.item);

                    });
//console.log(cart);
//todo called twice??
                /*scope.itemInCart = function(){
                    console.log('incart' + scope.item.id);
                    return true;
                }*/

                //})
            }
        }
    }])
});