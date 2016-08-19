define(['angular', 'app'], function(angular, app){
    angular.module('app')
        .directive('infinityscroll', function(){
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attributes){
                    //todo onclick, loader animation, button "more"
                    $(window).bind('scroll', function(){
                        if($(window).scrollTop() == $(document).height() - $(window).height()  ) {
                            scope.$apply(attributes.infinityscroll);
                        }
                    })
                }
            }
        })
});
