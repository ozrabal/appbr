define(['angular', 'app'], function(angular, app){
    angular.module('app')
        .directive('addToCart', function(){
        return{
            restrict: 'A',

            scope: {
                item: '@'
            },

            link: function(scope, element, attributes){
                //scope.$watch('item', function(item) {
                element.bind('click', function(){
                   // console.log(addToCart);

                        console.log(attributes.item);
                    });
                //})
            }
        }
    })
});