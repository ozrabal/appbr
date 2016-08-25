define([
    'angular'
],
function(angular){
    angular.module('cart', [])
        .config([function(){

        }])
        .controller('CartController', ['$scope', function($scope){
            console.log('incart' + $scope.item.id);
            $scope.itemInCart = function(){
                console.log('incart' + scope.item.id);
                return true;
            }
        }])
})