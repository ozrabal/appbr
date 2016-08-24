define(['angular', 'app'], function(angular, app){
    angular.module('app')
        .directive('addToCart', function(){
        return{
            restrict: 'E',
            templateUrl:'app/cart/addtocart.html',
            scope: {
                item: '='
            },
            //transclude: true,
            link: function(scope, element, attributes){
                //scope.$watch('item', function(item) {
                element.bind('click', function(){
                        console.log(scope.item);

                    });
//todo called twice??
                scope.itemInCart = function(){
                    console.log('incart' + scope.item.id);
                    return true;
                }

                //})
            }
        }
    })
});